import {
  registerDecorator,
  type ValidationOptions,
  type ValidationArguments,
} from 'class-validator';

export function StartWith(
  prefix: string,
  validationOptions?: ValidationOptions,
) {
  return (object: object, propertyName: string) =>
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'string' && value.startsWith(prefix);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must start with ${prefix}`;
        },
      },
    });
}
