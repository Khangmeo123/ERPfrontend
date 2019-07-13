export class SearchEntity {
    id: string;

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
