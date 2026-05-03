import { Body, Controller, Get, Post } from '@nestjs/common';
import { NoteGroupService } from './note-group.service';
import { ApiOperation } from '@nestjs/swagger';
import { NoteGroup } from 'src/tempo/types';


@Controller('note-group')
    export class NoteGroupController {
    constructor(private readonly noteGroup: NoteGroupService){}

    @Get('/get-list')
    @ApiOperation({ summary: 'Получить все группы заметок' })
    getAllNoteGroups(): Promise<Object[]> {
        return this.noteGroup.getAllNoteGroups();
    }

    @Post('/create')
    @ApiOperation({summary: 'Создать группу заметок'})
    createNoteGroup(@Body() noteGroup:any): any{
        return this.noteGroup.createNoteGroup(noteGroup)
    }
}
