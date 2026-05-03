import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { NotesService } from './notes.service'; 
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('note')
export class NotesController {
      constructor(private readonly notesService: NotesService) {}

  @Get('/get-list')
  @ApiOperation({ summary: 'Получить все заметки' })
  getTasks(): Promise<Object[]> {
    return this.notesService.getNotes();
  }

  @Post('/create')
  @ApiOperation({ summary: 'Создать заметку' })
  createTask(@Body() noteValue : any): any{
    return this.notesService.createNote(noteValue);
  }

  @Post('/delete/:uid')
  @ApiOperation({ summary: 'Удалить заметку' })
  deleteTask(@Param('uid') noteUid: string): any{
    return this.notesService.deleteNote(noteUid);
  }
}
