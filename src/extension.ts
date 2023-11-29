import * as vscode from 'vscode';

function dimFile(activeEditor: vscode.TextEditor) {
	if (!activeEditor.document.getText().trim()) { return; }
	const position = activeEditor.selection.active;
	console.log(position);

}

export function activate(context: vscode.ExtensionContext) {
	console.log('extension active');
	let disposable = vscode.commands.registerCommand('block-dimmer.helloWorld', () => {
		const activeEditor = vscode.window.activeTextEditor;
		if (!activeEditor) { return; }
		console.log('trigger');
		dimFile(activeEditor);
	});
	context.subscriptions.push(disposable);
	const activeEditor = vscode.window.activeTextEditor;
	if (!activeEditor) { return; }
	console.log('start');
	dimFile(activeEditor);
}

vscode.window.onDidChangeActiveTextEditor((activeEditor) => {
	if (!activeEditor) { return; }
	const fileExtName = activeEditor.document.fileName.split('.').pop();
	if (!fileExtName || !['js', 'jsx', 'ts', 'tsx'].includes(fileExtName)) { return; }
	console.log('onchange');
	dimFile(activeEditor);
});


export function deactivate() { }
