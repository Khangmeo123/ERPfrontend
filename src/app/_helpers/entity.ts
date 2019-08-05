export class Entity {
  id: string;

  isDeleted: boolean = true;

  isEdited: boolean = true;

  error: any;

  constructor(entity: any) {
    if (entity !== null && entity !== undefined) {
      Object.keys(entity).forEach((item) => {
        if (entity[item] && typeof entity[item] === 'object' && entity[item].constructor === Object) {
          this[item] = {};
          Object.assign(this[item], entity[item]);
        }
        if (entity[item] && typeof entity[item] === 'object' && entity[item].constructor === Array) {
          this[item] = [...entity[item]];
        }
        if (typeof entity[item] === 'boolean' || typeof entity[item] === 'string' || typeof entity[item] === 'number') {
          this[item] = entity[item];
        }
      });
    }
  }
}

export class Entities {
  ids: any[] = [];
  exceptIds: any[] = [];

  constructor() {

  }
}

export class EnumEntity {
    id: string;
    name: string;

    constructor() {

    }
}
