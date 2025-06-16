// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

export type ExposeInRendererTypes = typeof exposeInRenderer;
const exposeInRenderer = {
	toggleDevTools: () => ipcRenderer.send('toggleDevTools'),
	setTitleBarColors: (bgColor: string, iconColor: string) => {
		document.documentElement.style.background = bgColor;
		ipcRenderer.send('setTitleBarColors', bgColor, iconColor);
	},
	writeToTerm: (data: string) => ipcRenderer.send('writeToTerm', data),
	termToRenderer: (callback: (arg0: any) => void) => ipcRenderer.on('termToRenderer', (_event, value)=>callback(value))
};

for (const [key, value] of Object.entries(exposeInRenderer)) contextBridge.exposeInMainWorld(key, value);