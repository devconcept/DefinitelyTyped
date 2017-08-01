// Type definitions for multer-gridfs-storage 2.0
// Project: https://github.com/devconcept/multer-gridfs-storage
// Definitions by: devconcept <https://github.com/devconcept/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

import {EventEmitter} from 'events';
import {Express} from 'express';
import * as Multer from 'multer';
import {Db} from 'mongodb';

type FileConfigResult = Promise<MulterGridfsStorage.FileConfig> | MulterGridfsStorage.FileConfig;

interface MulterGfsOptions {
    file?: (req: Express.Request, file: Express.Multer.File) => FileConfigResult;
}

declare class MulterGridfsStorage extends EventEmitter implements Multer.StorageEngine {
    constructor(settings: MulterGridfsStorage.UrlStorageOptions | MulterGridfsStorage.DbStorageOptions);

    _handleFile(req: Express.Request, file: Express.Multer.File, callback: (error?: any, info?: Express.Multer.File) => void): void;

    _removeFile(req: Express.Request, file: Express.Multer.File, callback: (error: Error) => void): void;
}

declare namespace MulterGridfsStorage {
    interface UrlStorageOptions extends MulterGfsOptions {
        url: string;
        connectionOpts?: object;
    }

    interface DbStorageOptions extends MulterGfsOptions {
        db: Promise<Db> | Db;
    }

    interface FileConfig {
        filename?: string;
        id?: any;
        metadata?: any;
        chunkSize?: number;
        bucketName?: string;
        contentType?: string;
    }
}

// Merge multer's file declaration with ours
declare global {
    namespace Express {
        namespace Multer {
            interface File {
                id: any;
                filename: string;
                metadata: any;
                contentType: string;
                chunkSize: number;
                bucketName: string;
                uploadDate: Date;
                md5: string;
                size: number;
            }
        }
    }
}

export = MulterGridfsStorage;
