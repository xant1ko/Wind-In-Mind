import { Test, TestingModule } from '@nestjs/testing';
import { NoteGroupController } from './note-group.controller';

describe('NoteGroupController', () => {
  let controller: NoteGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NoteGroupController],
    }).compile();

    controller = module.get<NoteGroupController>(NoteGroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
