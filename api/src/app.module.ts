import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { NotesModule } from './notes/notes.module';
import { NoteGroupModule } from './note-group/note-group.module';

@Module({
  imports: [TasksModule, NotesModule, NoteGroupModule],
})
export class AppModule {}
