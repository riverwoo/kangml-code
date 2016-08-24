<?php
//decode by QQ:270656184 http://www.yunlu99.com/

if (!defined('IN_IA')) {
    exit('Access Denied');
}
class Ewei_DShop_Qrcode
{
    public function createShopQrcode($mid = 0, $posterid = 0)
    {
        global $_W, $_GPC;
        $path = IA_ROOT . "/addons/ewei_shop/data/qrcode/" . $_W['uniacid'] . "/";
        if (!is_dir($path)) {
            load()->func('file');
            mkdirs($path);
        }
        $url = $_W['siteroot'] . 'app/index.php?i=' . $_W['uniacid'] . '&c=entry&m=ewei_shop&do=shop&mid=' . $mid;
        if (!empty($posterid)) {
            $url .= '&posterid=' . $posterid;
        }
        $file        = 'shop_qrcode_' . $posterid . '_' . $mid . '.png';
        $qrcode_file = $path . $file;
        if (!is_file($qrcode_file)) {
            require IA_ROOT . '/framework/library/qrcode/phpqrcode.php';
            QRcode::png($url, $qrcode_file, QR_ECLEVEL_L, 4);
        }
        return $_W['siteroot'] . 'addons/ewei_shop/data/qrcode/' . $_W['uniacid'] . '/' . $file;
    }
    public function createGoodsQrcode($mid = 0, $goodsid = 0, $posterid = 0)
    {
        global $_W, $_GPC;
        $path = IA_ROOT . "/addons/ewei_shop/data/qrcode/" . $_W['uniacid'];
        if (!is_dir($path)) {
            load()->func('file');
            mkdirs($path);
        }
        $url = $_W['siteroot'] . 'app/index.php?i=' . $_W['uniacid'] . '&c=entry&m=ewei_shop&do=shop&p=detail&id=' . $goodsid . '&mid=' . $mid;
        if (!empty($posterid)) {
            $url .= '&posterid=' . $posterid;
        }
        $file        = 'goods_qrcode_' . $posterid . '_' . $mid . '_' . $goodsid . '.png';
        $qrcode_file = $path . '/' . $file;
        if (!is_file($qrcode_file)) {
            require IA_ROOT . '/framework/library/qrcode/phpqrcode.php';
            QRcode::png($url, $qrcode_file, QR_ECLEVEL_L, 4);
        }
        return $_W['siteroot'] . 'addons/ewei_shop/data/qrcode/' . $_W['uniacid'] . '/' . $file;
    }
}