import * as functions from '@google-cloud/functions-framework';
import { streamingUpload } from './upload-as-stream';

functions.http('streamingUpload', streamingUpload);
