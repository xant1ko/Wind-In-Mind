import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { NotesModule } from './notes/notes.module';
import { NoteGroupModule } from './note-group/note-group.module';
import { LabelToTaskModule } from './label-to-task/label-to-task.module';
import { LabelModule } from './label/label.module';

@Module({
  imports: [TasksModule, NotesModule, NoteGroupModule, LabelToTaskModule, LabelModule],
})
export class AppModule {}
