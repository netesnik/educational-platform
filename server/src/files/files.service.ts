import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import * as path from 'node:path'
import * as fs from 'node:fs'

@Injectable()
export class FilesService {
  
  async saveFile(buffer: Buffer, name: string, folder: string): Promise<void> {
    try {
      const filePath = path.resolve(process.env.STORAGE_PATH, folder)
      const fullPath = path.join(filePath, name)
      this.validatePath(fullPath)
      
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, {recursive: true})
      }
      if (fs.existsSync(fullPath)) {
        throw new HttpException('A file with the same name already exists in the selected folder', HttpStatus.CONFLICT)
      }
      fs.writeFileSync(path.join(filePath, name), buffer)

    } catch (error) {
      if (error.name === 'HttpException') {
        throw error
      } else {
        throw new HttpException('An error occurred while writing the file', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  getFile(filePath: string): StreamableFile {
    try {
      const fullPath = path.join(process.env.STORAGE_PATH, filePath)
      this.validatePath(fullPath)

      if (!fs.existsSync(fullPath)) {
        throw new HttpException('File not found', HttpStatus.NOT_FOUND)
      }
      const file = fs.createReadStream(fullPath)
      return new StreamableFile(file)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('An error occurred while reading the file', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  private validatePath(path: string) {
    if (!path.startsWith(process.env.STORAGE_PATH)) {
      throw new HttpException('Dangerous operation', HttpStatus.BAD_REQUEST)
    }
  }
}
