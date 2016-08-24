<?php
//decode by QQ:270656184 http://www.yunlu99.com/
if (!defined('IN_IA')) {
    exit('Access Denied');
}
class Plugin extends Core
{
    public $pluginname;
    public $model;
    public function __construct($name = '')
    {
        parent::__construct();
        $this->modulename = 'ewei_shop';
        $this->pluginname = $name;
        $this->loadModel();
        if (strexists($_SERVER['REQUEST_URI'], '/web/')) {
            cpa($this->pluginname);
        } else if (strexists($_SERVER['REQUEST_URI'], '/app/')) {
            
                $this->setFooter();  
	}
        $this->module['title'] = pdo_fetchcolumn('select title from ' . tablename('modules') . " where name='ewei_shop' limit 1");
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
    public function getSet()
    {
        return $this->model->getSet();
    }
    public function updateSet($data = array())
    {
        $this->model->updateSet($data);
    }
    public function template($filename, $type = TEMPLATE_INCLUDEPATH)
    {
        global $_W;
        $defineDir = IA_ROOT . "/addons/ewei_shop/";
        if (defined('IN_SYS')) {
            $source  = IA_ROOT . "/addons/ewei_shop/plugin/" . $this->pluginname . "/template/{$filename}.html";
            $compile = IA_ROOT . "/data/tpl/web/{$_W['template']}/ewei_shop/plugin/" . $this->pluginname . "/{$filename}.tpl.php";
            if (!is_file($source)) {
                $source  = IA_ROOT . "/addons/ewei_shop/template/{$filename}.html";
                $compile = IA_ROOT . "/data/tpl/web/{$_W['template']}/ewei_shop/{$filename}.tpl.php";
            }
            if (!is_file($source)) {
                $source  = IA_ROOT . "/web/themes/{$_W['template']}/{$filename}.html";
                $compile = IA_ROOT . "/data/tpl/web/{$_W['template']}/{$filename}.tpl.php";
            }
            if (!is_file($source)) {
                $source  = IA_ROOT . "/web/themes/default/{$filename}.html";
                $compile = IA_ROOT . "/data/tpl/web/default/{$filename}.tpl.php";
            }
        } else {
            $global_template = m('cache')->getString('template_shop');
            if (empty($global_template)) {
                $global_template = "default";
            }
            if (!is_dir(IA_ROOT . '/addons/ewei_shop/template/mobile/' . $global_template)) {
                $global_template = "default";
            }
            $template = m('cache')->getString('template_' . $this->pluginname);
            if (empty($template)) {
                $template = "default";
            }
            if (!is_dir(IA_ROOT . '/addons/ewei_shop/plugin/' . $this->pluginname . "/template/mobile/" . $template)) {
                $template = "default";
            }
            $compile = IA_ROOT . "/data/app/ewei_shop/plugin/" . $this->pluginname . "/{$template}/mobile/{$filename}.tpl.php";
            $source  = $defineDir . "/plugin/" . $this->pluginname . "/template/mobile/{$template}/{$filename}.html";
            if (!is_file($source)) {
                $source  = $defineDir . "/plugin/" . $this->pluginname . "/template/mobile/default/{$filename}.html";
                $compile = IA_ROOT . "/data/app/ewei_shop/plugin/" . $this->pluginname . "/default/mobile/{$filename}.tpl.php";
            }
            if (!is_file($source)) {
                $source  = $defineDir . "/template/mobile/{$global_template}/{$filename}.html";
                $compile = IA_ROOT . "/data/app/ewei_shop/{$global_template}/{$filename}.tpl.php";
            }
            if (!is_file($source)) {
                $source  = $defineDir . "/template/mobile/default/{$filename}.html";
                $compile = IA_ROOT . "/data/app/ewei_shop/default/{$filename}.tpl.php";
            }
            if (!is_file($source)) {
                $source  = $defineDir . "/template/mobile/{$filename}.html";
                $compile = IA_ROOT . "/data/app/ewei_shop/{$filename}.tpl.php";
            }
            if (!is_file($source)) {
                $names      = explode('/', $filename);
                $pluginname = $names[0];
                $ptemplate  = m('cache')->getString('template_' . $pluginname);
                if (empty($ptemplate)) {
                    $ptemplate = "default";
                }
                if (!is_dir(IA_ROOT . '/addons/ewei_shop/plugin/' . $pluginname . "/template/mobile/" . $ptemplate)) {
                    $ptemplate = "default";
                }
                $pfilename = $names[1];
                $source    = IA_ROOT . "/addons/ewei_shop/plugin/" . $pluginname . "/template/mobile/" . $ptemplate . "/{$pfilename}.html";
            }
        }
        if (!is_file($source)) {
            exit("Error: template source '{$filename}' is not exist!");
        }
        if (DEVELOPMENT || !is_file($compile) || filemtime($source) > filemtime($compile)) {
            shop_template_compile($source, $compile, true);
        }
        return $compile;
    }
    public function _exec_plugin($do, $web = true)
    {
        global $_GPC;
        if ($web) {
            $file = IA_ROOT . "/addons/ewei_shop/plugin/" . $this->pluginname . "/core/web/" . $do . ".php";
        } else {
            $file = IA_ROOT . "/addons/ewei_shop/plugin/" . $this->pluginname . "/core/mobile/" . $do . ".php";
        }
        if (!is_file($file)) {
            message("未找到控制器文件 : {$file}");
        }
        include $file;
        exit;
    }
}