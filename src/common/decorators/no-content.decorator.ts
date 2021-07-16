import { HttpCode } from '@nestjs/common';

export const NoContent = () => HttpCode(204);
