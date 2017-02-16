const TAG = "[LokiReactNativeAdapter]";
class LokiElectronAdapter {
    constructor(options) {
        this.options = options;
        this.fs = window.nodeRequire('fs');
    }
    loadDatabase(dbname, callback) {
        this.fs.stat(dbname,  (err, stats)=> {
            if (!err && stats.isFile()) {
                this.fs.readFile(dbname, {
                    encoding: 'utf8'
                }, function readFileCallback(err, data) {
                    if (err) {
                        callback(new Error(err));
                    } else {
                        callback(data);
                    }
                });
            }
            else {
                callback(null);
            }
        });
    }
    saveDatabase(dbname, dbstring, callback) {
        //console.log(TAG, "saving database");
        var tmpdbname = dbname + '~';
        this.fs.writeFile(tmpdbname, dbstring, (err) =>{
            if (err) {
                callback(new Error(err));
            } else {
                this.fs.rename(tmpdbname, dbname, callback);
            }
        });
    }

    deleteDatabase(dbname, callback) {
        this.fs.unlink(dbname, (err) =>{
        if (err) {
          callback(new Error(err));
        } else {
          callback();
        }
      });
    }
}


export default LokiElectronAdapter;