import { ApiProperty } from "@nestjs/swagger";


export class CreateTaskDto {
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
        example:'Приоритетность',
        required: true,
    })
    priority?: 'firstPlan' | 'secondplan' | 'longDistance';

    @ApiProperty({
        example:'Статус выполнения',
        required: true,
    })
    isDone?: boolean;


}

//   title?: string,
//   description?: string,
//   dateCompleted?: string,
//   priority?: 'firstPlan' | 'secondplan' | 'longDistance'
//   isDone?: boolean
//   uid?: string
//   createdDate: Date | string