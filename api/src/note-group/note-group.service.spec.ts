import { Test, TestingModule } from '@nestjs/testing';
import { NoteGroupService } from './note-group.service';

describe('NoteGroupService', () => {
  let service: NoteGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoteGroupService],
    }).compile();

    service = module.get<NoteGroupService>(NoteGroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
