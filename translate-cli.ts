const fs = require('fs');
const commander = require('commander');
const {execSync} = require('child_process');

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

    generateOptions() {
        return Object.entries(this.options)
            .map(([key, value]) => {
                const valueString: string = value === null ? '' : `${value}`;
                return `--${key} ${valueString}`;
            }).join(' ');
    }

    generateCommand(input, output) {
        const optionString = this.generateOptions();
        return `ngx-translate-extract --input ${input} --output ${output} ${optionString}`;
    }

    generateAllModules() {
        console.log(fs.readdirSync(this.rootPath));
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

    generateGeneralTranslation() {

    }
}

const translateCLI: TranslateCLI = new TranslateCLI();

const translateSpecificModule = (modulePath: string) => {
    if (modulePath.match(/^[A-z0-9\-]+.[A-z0-9-]+$/gm)) {
        const [mainModule, subModule] = modulePath.split('/');

        const input: string = translateCLI.getInputPath(mainModule, subModule);

        const outputFiles: string[] = translateCLI.getOutputPath(mainModule, subModule);

        const command: string = translateCLI.generateCommand(input, outputFiles.join(' '));

        exec(command);

        outputFiles.map((file: string) => {
            const translations: any = require(file);
            delete translations.general;
            fs.writeFileSync(file, JSON.stringify(translations, null, 4));
        });
    }
};

const generateGeneralTranslate = () => {
    const input: string = './src/app';

    const outputFiles: string[] = translateCLI.languages.map((language: string) => {
        return `./src/assets/i18n/${language}.general.json`;
    });

    const command: string = translateCLI.generateCommand(input, outputFiles.join(' '));

    exec(command);

    outputFiles.map((file: string) => {
        const translations: any = require(file);
        const result = {
            general: translations.general,
        };
        fs.writeFileSync(file, JSON.stringify(result, null, 4));
    });
};


commander
    .command('translate <modulePath>')
    .description('Translate a specific module')
    .action((modulePath: string) => {
        if (modulePath === 'general') {
            generateGeneralTranslate();
        } else {
            if (modulePath) {
                translateSpecificModule(modulePath);
            } else {
                throw new Error('Module path must be provided');
            }
        }
    });

commander.parse(process.argv);
