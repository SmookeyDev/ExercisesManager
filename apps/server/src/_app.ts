import server from './helpers/server';
import { PORT } from './helpers/environment';
import { connectToDatabase } from './helpers/database';
import { Logger } from './helpers/logger';

(async () => {
    try { await connectToDatabase(); }
    catch { process.exit(1); }
    
    server.listen(PORT, () => {
        Logger.info(`Server started on port ${PORT}`);
    });
})();