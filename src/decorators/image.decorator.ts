/* eslint-disable prettier/prettier */
// image.decorator.ts

import { applyDecorators } from "@nestjs/common";
import { Column } from "typeorm";

export function ImageColumn(): PropertyDecorator {
  return applyDecorators(
    Column({
      type: "varchar", // O el tipo de columna que desees usar para almacenar la ruta de la imagen en la base de datos
      length: 255, // Ajusta la longitud según tus necesidades
    }),
  );
}
