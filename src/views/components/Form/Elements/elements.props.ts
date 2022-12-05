import { IFormBoard } from './../../FormBoard/FormBoard';
import { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes } from 'react';
import { FieldError, UseFormGetValues } from 'react-hook-form';
import { TypeMaterialIconNameBS } from '../../../../utils/MaterialIcon';
import { IRegister } from '../form.interface';
import { IFormColumn } from '../../FormColumn/FormColumn';
import { IFormTask } from '../../FormTask/FormTask';

export type IButton = ButtonHTMLAttributes<HTMLButtonElement>;
export type IClose = HTMLAttributes<HTMLDivElement>;

export interface IFieldProps {
  placeholder: string;
  active?: boolean;
  icon: TypeMaterialIconNameBS;
  getValue?: { fn: UseFormGetValues<IRegister>; name: keyof IRegister };
  getValueBoard?: { fn: UseFormGetValues<IFormBoard>; name: keyof IFormBoard };
  getValueColumn?: { fn: UseFormGetValues<IFormColumn>; name: keyof IFormColumn };
  getValueTask?: { fn: UseFormGetValues<IFormTask>; name: keyof IFormTask };
  error?: FieldError | undefined;
}

type TypeInputPropsField = InputHTMLAttributes<HTMLInputElement> & IFieldProps;

export type IField = TypeInputPropsField;
