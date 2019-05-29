/* global baidu,ZeroClipboard*/
/* globals WE  */
UE.plugins.sectionwxb = function () {
    var me = this;

    var clickPop = new baidu.editor.ui.Popup({
        content: "",
        editor: me,
        _remove: function () {
            me.undoManger.save();
            $(clickPop.anchorEl).remove();
            clickPop.hide();
            me.undoManger.save();
        },
        _copy: function () {
            clickPop.hide();
        },
        _cut: function () {
            clickPop.hide();
        },
        select: function () {
            var range = me.selection.getRange();
            range.selectNode(clickPop.anchorEl);
            range.select();
        },
        _blank: function () {
            me.undoManger.save();
            $('<p><br/></p>').insertAfter(clickPop.anchorEl);
            me.undoManger.save();
        },
        _preblank: function () {
            me.undoManger.save();
            $('<p><br/></p>').insertBefore(clickPop.anchorEl);
            me.undoManger.save();
        },
        _changeColor: function (e) {
            var em = $(clickPop.anchorEl),
                content = em.html(),
                top = $(e).offset().top - 240,
                left = $(e).offset().left + 45;

            me.fireEvent('extendChangeColor', {
                content: content,
                top: top,
                left: left,
                callback: function(res){
                    em.html(res);
                }
            });
        },
        _wxbitem: null,
        className: 'edui-bubble'
    });

    var editor_document = null;

    //baiting: 避免出错，先注释(不应该直接依赖外部库, 可通过配置项或者其它方式注入)
    me.addListener("beforepaste", function (eventName, html, root) {
        // html.html = Material.beautifyHtml(html.html);
    });

    me.addListener("click", function (t, evt) {
            evt = evt || window.event;
            var el = evt.target || evt.srcElement;
            var tagName = el.tagName;
            var $el = $(el);
            if (tagName === 'body') {
                $el.find('.wxb-style.active').removeClass('active');
            }
            var body = $el.parents('body');
            body.find('.wxb-style.active').removeClass('active');
            if (tagName === 'AREA') {
                var usemap = $el.parent('map').attr('id');
                var imgel = $("img[usemap='#" + usemap + "']", editor_document).get(0);
                var range = me.selection.getRange();
                range.selectNode(imgel);
                range.select();
                if (me.ui._dialogs.insertimageDialog) {
                    range = me.selection.getRange();
                    range.selectNode(imgel);
                    range.select();
                    me.ui._dialogs.insertimageDialog.open();
                }
                return;
            }
            if (tagName === "IMG") {

                return;
            }


            var match = false;
            if (el.tagName === "QQMUSIC" || el.tagName === "MPVOICE") {
                match = true;
            }
            if (!match) {
                if ($el.parent()[0].tagName !== 'BODY') {
                    $el.parents().each(function () {
                        if ($(this).parent()[0].tagName === 'BODY') {
                            el = $(this)[0];//非 body > * 的节点，向上查找到 body 下的那一级的节点
                            if (el.tagName === "SECTION") {
                                match = true;
                                $el = $(el);
                            }
                        }
                    });
                } else {
                    if (el.tagName === "SECTION") {
                        match = true;
                    }
                }
            }


            if (match === false) {
                return;
            }

            //135 会在最外层加上 <section class="135article"> content... </section>
            if ($el.hasClass('135article')) {
                $el.replaceWith($el.html());
            }
            $el.addClass('active');
            clickPop.render();
            var html = clickPop.formatHtml('<nobr class="wxb-editor-popup-tool">' +
                // '<span class="copy" onclick="$$._copy()" stateful>' + '复制</span>' +
                // '<span class="cut" onclick="$$._cut()" stateful>' + '剪切</span>' +
                '<span class="select" title="选中后，可以更换为文字样式" onclick="$$.select()" stateful>' + '选中</span>' +
                '<span onclick="$$._remove()" stateful>' + '删除</span>' +
                '<span onclick="$$._blank()" stateful>' + '下空行</span>' +
                '<span onclick="$$._preblank()" stateful>' + '上空行</span>' +
                '<span onclick="$$._changeColor(this)" stateful>' + '换色</span>' +
                '<a class="_wxb-audio hidden" style="color: #027300; margin-left: 5px;" target="_blank" href="" download="" stateful>' + '下载音频</a>' +
                '</nobr>');
            var content = clickPop.getDom('content');
            content.innerHTML = html;

            if ($el.hasClass('js_editor_audio')) {
                var fileId = $el.attr('voice_encode_fileid');
                var fileName = $el.attr('data-name');
                var _audioTarget = $(content).find('._wxb-audio');
                _audioTarget.attr('href', 'http://res.wx.qq.com/voice/getvoice?mediaid=' + fileId);
                _audioTarget.attr('download', fileName + '.mp3');
                _audioTarget.removeClass('hidden');
            }
            var bdbg_flag = false;
            $el.find('*').each(function () {
                    if (this.style.background || this.style.border || this.style.borderBottom || this.style.borderTop || this.style.borderLeft || this.style.borderRight) {
                        bdbg_flag = true;
                    }
                }
            );


            clickPop.anchorEl = el;
            clickPop.showAnchor(clickPop.anchorEl);


            if (!ZeroClipboard) {
                $(clickPop.getDom('content')).find('.copy').remove();
                $(clickPop.getDom('content')).find('.cut').remove();
            } else {
                var client = new ZeroClipboard($(clickPop.getDom('content')).find('.copy'));
                client.on('ready', function (event) {
                    client.on('copy', function (event) {
                        event.clipboardData.setData('text/html', $(clickPop.anchorEl).prop('outerHTML'));
                        clickPop.hide();
                        toastr.success("", "已成功复制到剪切板");
                    });
                });
                var cut_client = new ZeroClipboard($(clickPop.getDom('content')).find('.cut'));
                cut_client.on('ready', function (event) {
                    cut_client.on('copy', function (event) {
                        event.clipboardData.setData('text/html', $(clickPop.anchorEl).prop('outerHTML'));
                        clickPop.hide();
                        $(clickPop.anchorEl).remove();
                        toastr.success("", "已成功剪切到剪切板");
                    });
                });
            }


        }
    );

    function transforImgUrl(url) {
        url = url.replace(/^https?:\/\/mmbiz\.q(logo|pic)\.cn\/mmbiz/i, 'https://mmbiz.qlogo.cn/mmbiz');
        url = url.replace(/&wxfrom=\d+/g, '');
        url = url.replace(/wxfrom=\d+/g, '');
        url = url.replace(/&tp=[a-z]+/g, '');
        url = url.replace(/tp=[a-z]+/g, '');
        url = url.replace(/\?&/g, '?');
        url = url.replace(/&$/g, '');
        return url;
    }
};
