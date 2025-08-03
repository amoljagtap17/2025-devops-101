import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postsRepository.create(createPostDto);

    return this.postsRepository.save(post);
  }

  findAll() {
    return this.postsRepository.find();
  }

  findOne(id: string) {
    return this.postsRepository.findOneBy({ id });
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    return this.postsRepository
      .update(id, updatePostDto)
      .then(() => this.findOne(id));
  }

  remove(id: string) {
    return this.postsRepository.delete(id).then(() => ({ deleted: true }));
  }
}
