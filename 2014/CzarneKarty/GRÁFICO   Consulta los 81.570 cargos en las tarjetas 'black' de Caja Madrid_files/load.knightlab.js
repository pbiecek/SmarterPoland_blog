function CreateAsyncProcess(url_process) {
    var AsyncProcess = document.createElement('script');
    AsyncProcess.type = 'text/javascript';
    AsyncProcess.async = true;
    AsyncProcess.src = url_process;
    document.getElementsByTagName('head')[0].appendChild(AsyncProcess);
}

CreateAsyncProcess('//connect.soundcloud.com/sdk.js');
CreateAsyncProcess('//cdn.knightlab.com/libs/soundcite/latest/js/soundcite.min.js');