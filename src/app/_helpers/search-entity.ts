export class SearchEntity {
    id: string;
    skip: number;
    take: number;

    constructor(searchEntity: any) {
        if (searchEntity !== null && searchEntity !== undefined) {
            Object.keys(searchEntity).forEach((item) => {
                if (searchEntity.hasOwnProperty(item)) {
                    this[item] = searchEntity[item];
                }
            });
        }
    }

}
