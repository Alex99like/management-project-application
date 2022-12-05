import React, { FC } from 'react';
import * as MaterialItemsMD from 'react-icons/md';
import * as MaterialItemAI from 'react-icons/ai';
import * as MaterialItemsBS from 'react-icons/bs';

export type TypeMaterialIconNameMD = keyof typeof MaterialItemsMD;
export type TypeMaterialIconNameAI = keyof typeof MaterialItemAI;
export type TypeMaterialIconNameBS = keyof typeof MaterialItemsBS;

export const MaterialIconMD: FC<{ name: TypeMaterialIconNameMD }> = ({ name }) => {
  const IconComponent = MaterialItemsMD[name];

  return <IconComponent /> || <MaterialItemsMD.MdDragIndicator />;
};

export const MaterialIconAI: FC<{ name: TypeMaterialIconNameAI }> = ({ name }) => {
  const IconComponent = MaterialItemAI[name];

  return <IconComponent /> || <MaterialItemAI.AiFillWarning />;
};

export const MaterialIconBS: FC<{ name: TypeMaterialIconNameBS }> = ({ name }) => {
  const IconComponent = MaterialItemsBS[name];

  return <IconComponent /> || <MaterialItemsBS.BsAlarm />;
};
