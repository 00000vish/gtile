import logger from './logger.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

function createSize(x, y, width, height) {
    return {
        x: x,
        y: y,
        width: width,
        height: height,
    }
}

export function getScreenSize(workspace) {
    logger(`Getting monitor info for workspace ${workspace.index()}`);

    let monitors = Main.layoutManager.monitors;
    let display = workspace.get_display();
    let monitorIndex = display.get_current_monitor();
    let monitor = monitors[monitorIndex];

    let topBar = Main.panel;
    let barHeight = topBar.actor.get_height();

    let x = 0;
    let y = barHeight;
    let width = monitor.width;
    let height = monitor.height - barHeight;

    return createSize(x, y, width, height);
}

export function splitScreenHorizontal(screen, splitCount) {
    let newWidth = screen.width / splitCount;
    let newHeight = screen.height;

    return _splitScreen(splitCount, screen, newWidth, newHeight, false);
}


export function splitScreenVertical(screen, splitCount) {
    let newWidth = screen.width;
    let newHeight = screen.height / splitCount;

    return _splitScreen(splitCount, screen, newWidth, newHeight, true);
}

function _splitScreen(splitCount, screenSize, newWidth, newHeight, vertical) {
    let newSizes = []

    let x = screenSize.x;
    let y = screenSize.y;

    for (let v = 0; v < splitCount; v++) {
        var size = createSize(x, y, newWidth, newHeight);
        newSizes.push(size);

        if (vertical) {
            y += newHeight;
        }
        else {
            x += newWidth;
        }
    }

    return newSizes;
}