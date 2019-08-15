const fs = require('fs');
const commander = require('commander');
const {execSync} = require('child_process');
const merge = require('deepmerge');

function exec(command: string) {
    const processOptions = {
        stdio: [
            process.stdout,
            process.stdin,
            process.stderr,
        ],
    };
    execSync(command, processOptions);
}

interface IOptions {
    clean?: string;
    sort?: string;
    format?: string;
    marker?: string;
}

class TranslateCLI {
    private static instance: TranslateCLI;

    public languages: string[] = [
        'vi',
        'en',
    ];

    private options: IOptions = {
        clean: null,
        sort: null,
        format: 'namespaced-json',
        marker: 'translate',
    };

    private rootPath: string = './src';

    private rootModulePath: string = './src/app/_modules';

    private constructor() {
    }

    public static getInstance(): TranslateCLI {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }

    generateCommand(input, output) {
        const optionString = this.generateOptions();
        return `ngx-translate-extract --input ${input} --output ${output} ${optionString}`;
    }

    translate(input: string, output: string) {
        const command: string = this.generateCommand(input, output);
        exec(command);
    }

    getInputPath(module: string, subModule: string): string {
        return `${this.rootPath}/app/_modules/${module}/_modules/${subModule}`;
    }

    getOutputPath(module: string, subModule: string): string[] {
        return this.languages
            .map((language: string) => {
                return `${this.rootPath}/assets/i18n/${module}.${subModule}.${language}.json`;
            });
    }

    generateTranslateForAllModules() {
        let modules: string[] = [];
        fs.readdirSync(this.rootModulePath)
            .forEach((entry: string) => {
                const entryPath: string = `${this.rootModulePath}/${entry}`;
                if (fs.lstatSync(entryPath).isDirectory()) {
                    const subModulePath: string = `${entryPath}/_modules`;
                    modules = [
                        ...modules,
                        ...fs.readdirSync(subModulePath)
                            .map((subModuleEntry: string) => {
                                return `${entry}/${subModuleEntry}`;
                            }),
                    ];
                }
            });
        modules.forEach((modulePath: string) => {
            this.translateSpecificModule(modulePath);
        });
    }

    translateSpecificModule(modulePath: string) {
        if (modulePath.match(/^[A-z0-9\-]+.[A-z0-9-]+$/gm)) {
            const [mainModule, subModule] = modulePath.split('/');
            const input: string = this.getInputPath(mainModule, subModule);
            const outputFiles: string[] = this.getOutputPath(mainModule, subModule);
            const command: string = this.generateCommand(input, outputFiles.join(' '));
            exec(command);
            this.deleteGeneralInSpecificFiles(outputFiles);
        }
    }

    deleteGeneralInSpecificFiles(outputFiles: string[]) {
        outputFiles.map((file: string) => {
            const translations: any = require(file);
            delete translations.general;
            fs.writeFileSync(file, JSON.stringify(translations, null, 4));
        });
    }

    generateTranslateForRestDirectories() {
        /**
         * Translate the rest directories
         */
        const directories: string[] = [
            '_shared',
            '_pages',
            '_services',
            '_repositories',
        ];
        directories.forEach((directory: string) => {
            const input: string = `./src/app/${directory}`;
            const outputFiles: string[] = this.languages.map((language: string) => {
                return `./src/assets/i18n/${directory.substr(1)}.${language}.json`;
            });
            const output: string = outputFiles.join(' ');
            this.translate(input, output);
            this.deleteGeneralInSpecificFiles(outputFiles);
        });
    }

    /**
     * Isolate "general" namespace into a file
     */
    generateGeneralTranslations() {
        const input: string = './src/app';
        const outputFiles: string[] = this.languages.map((language: string) => {
            return `./src/assets/i18n/general.${language}.json`;
        });
        const command: string = this.generateCommand(input, outputFiles.join(' '));
        exec(command);
        outputFiles.map((file: string) => {
            const translations: any = require(file);
            const result = {
                general: translations.general,
            };
            fs.writeFileSync(file, JSON.stringify(result, null, 4));
        });
    }

    public merge() {
        const translateFiles: string [] = fs.readdirSync('./src/assets/i18n');
        this.languages.forEach((language: string) => {
            const translates = translateFiles
                .filter((file: string) => {
                    return file.indexOf(`.${language}.json`) > 0;
                })
                .map((piece: string) => {
                    return require(`./src/assets/i18n/${piece}`);
                });
            const translateResult = merge.all(translates);
            fs.writeFileSync(`./src/assets/i18n/${language}.json`, JSON.stringify(translateResult, null, 4));
        });
    }

    private generateOptions() {
        return Object.entries(this.options)
            .map(([key, value]) => {
                const valueString: string = value === null ? '' : `${value}`;
                return `--${key} ${valueString}`;
            }).join(' ');
    }
}

const translateCLI: TranslateCLI = TranslateCLI.getInstance();

commander
    .command('translate <modulePath>')
    .description('Translate a specific module')
    .action((modulePath: string) => {
        if (!modulePath) {
            throw new Error('Module name must be provided');
        }

        switch (modulePath) {
            case 'general':
                translateCLI.generateGeneralTranslations();
                break;
            case 'rest':
                translateCLI.generateTranslateForRestDirectories();
                break;
            case 'all':
                translateCLI.generateTranslateForAllModules();
                translateCLI.generateGeneralTranslations();
                translateCLI.generateTranslateForRestDirectories();
                translateCLI.merge();
                break;
            case 'merge':
                translateCLI.merge();
                break;
            default:
                translateCLI.translateSpecificModule(modulePath);
        }

    });

commander.parse(process.argv);
