import { ApiProperty } from "@nestjs/swagger";


export class CreateLabelDto {
    @ApiProperty({
        example:'Название',
        required: true,
    })
    title?: string;

    @ApiProperty({
        example:'Описание',
        required: true,
    })
    description?: string;

    @ApiProperty({
        example:'Цвет',
        required: true,
    })
    color?: string

    @ApiProperty({
        example:'Статус выполнения',
        required: true,
    })
    type?: 'task';
}

//   uid?: string
//   title: string
//   description: string
//   color: string
//   type: 'task'