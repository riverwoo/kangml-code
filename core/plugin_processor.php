<?php
//decode by QQ:270656184 http://www.yunlu99.com/
if (!defined('IN_IA')) {
    exit('Access Denied');
}
require IA_ROOT . '/addons/ewei_shop/defines.php';
class PluginProcessor extends WeModuleProcessor
{
    public $model;
    public $modulename;
    public $message;
    public function __construct($name = '')
    {
        $this->modulename = 'ewei_shop';
        $this->pluginname = $name;
        $this->loadModel();
    }
    private function loadModel()
    {
        $modelfile = IA_ROOT . '/addons/' . $this->modulename . "/plugin/" . $this->pluginname . "/model.php";
        if (is_file($modelfile)) {
            $classname = ucfirst($this->pluginname) . "Model";
            require $modelfile;
            $this->model = new $classname($this->pluginname);
        }
    }
    public function respond()
    {
        $this->message = $this->message;
    }
}