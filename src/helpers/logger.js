import GLib from 'gi://GLib';

var logFileContent = "";

export default (data) => {
    let line = data;

    if (typeof line === 'object') {
        var obj = line;
        line = JSON.stringify(obj)
        line += Object.getOwnPropertyNames(obj)
    }

    logFileContent += line + "\n"

    let homeDir = GLib.get_home_dir();
    let filePath = GLib.build_filenamev([homeDir, 'gtile.log']);

    try {
        GLib.file_set_contents(filePath, logFileContent);
    } catch { }
}