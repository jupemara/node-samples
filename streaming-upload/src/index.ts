import * as functions from '@google-cloud/functions-framework';
import { streamingUpload } from './streaming-upload';

functions.http('streamingUpload', streamingUpload);
