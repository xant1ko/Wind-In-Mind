import { Module } from '@nestjs/common';
import { NoteGroupService } from './note-group.service';
import { NoteGroupController } from './note-group.controller';

@Module({
  providers: [NoteGroupService],
  controllers: [NoteGroupController]
})
export class NoteGroupModule {}
