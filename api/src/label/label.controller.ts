import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LabelService } from './label.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateLabelDto } from './dto/create-label.dto';

@Controller('label')
export class LabelController {

    constructor(private readonly label: LabelService){}

    @Get('/get-list')
    @ApiOperation({ summary: 'Получить все лейблы' })
    getAllLabels(): Promise<Object[]> {
        return this.label.getAllLabels();
    }

    @Post('/create')
      @ApiBody({
        type: CreateLabelDto,
        description: 'Данные для создания лейбла',
        examples: {
          example1: {
            summary: 'Простой лейбл',
            value: {
              title:'string',
              description:'string',
              color:'string',
              type: 'task'
            }
          },
        }
      })
    @ApiOperation({summary: 'Создать лейбл'})
    createLabel(@Body() label:any): any{
        return this.label.createLabel(label)
    }

    @Post('/get')
    @ApiOperation({summary: 'Получить подробную информацию о лейбле'})
    getLabelByUid(@Body() uid: string): any {
        return this.label.getLabelByUid(uid)
    }

    @Delete('/delete/:uid')
    @ApiOperation({summary: 'Удалить лейбл'})
    deleteLabel(@Param('uid') uid: string){
        return this.label.deleteLabel(uid)
    }

}
