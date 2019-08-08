import { Entity } from '../../../../_helpers/entity';

export class CodeFormulaEntity extends Entity {
  id: string;

  code: string;
  name: string;
  description: string;

  constructor(entity?: CodeFormulaEntity) {
    super(entity);
  }
}
