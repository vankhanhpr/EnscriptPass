#pragma checksum "F:\ASP.NET\ADHERER\source\Adherer\WebClient\Views\Admin\Discripline.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "1f69947213caa355299b46f710d09ed683450895"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Admin_Discripline), @"mvc.1.0.view", @"/Views/Admin/Discripline.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Admin/Discripline.cshtml", typeof(AspNetCore.Views_Admin_Discripline))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "F:\ASP.NET\ADHERER\source\Adherer\WebClient\Views\_ViewImports.cshtml"
using WebClient;

#line default
#line hidden
#line 2 "F:\ASP.NET\ADHERER\source\Adherer\WebClient\Views\_ViewImports.cshtml"
using WebClient.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"1f69947213caa355299b46f710d09ed683450895", @"/Views/Admin/Discripline.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"74eabcf7e030352eff2473b217adffa5ad5752fa", @"/Views/_ViewImports.cshtml")]
    public class Views_Admin_Discripline : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/css/admin/adbonus.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/admin/adnewdiscripline.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "F:\ASP.NET\ADHERER\source\Adherer\WebClient\Views\Admin\Discripline.cshtml"
  
    ViewData["Title"] = "Discripline";
    Layout = "~/Views/Shared/LayoutAdmin.cshtml";

#line default
#line hidden
            BeginContext(100, 2, true);
            WriteLiteral("\r\n");
            EndContext();
            DefineSection("Css", async() => {
                BeginContext(115, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(121, 70, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "2bc901c71a47497aafa94716e85018c0", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(191, 2, true);
                WriteLiteral("\r\n");
                EndContext();
            }
            );
            BeginContext(196, 412, true);
            WriteLiteral(@"
<div class=""k main-form"">
    <div class=""k body-form"">
        <div class=""k tab-title"">
            <span class=""k t t-title"">Quản lý kỷ luật</span>
            <span class=""k t t-note-dangbo"">Đảng bộ:</span>
            <select class=""k t select-option"" id=""sl-dangbo""></select>
            <span class=""k t t-note-dangbo"">Chi bộ:</span>
            <select class=""k t select-option"" id=""sl-chibo"">
");
            EndContext();
            BeginContext(674, 2317, true);
            WriteLiteral(@"            </select>
            <span class=""t bnt-add-new"" onclick=""getUserByCb()"" data-toggle=""modal"" data-target=""#modaladddesciption"">+Thêm mới</span>
        </div>
        <div class=""k tab-filte"">
            <span class=""k t t-form-day"">Từ ngày: </span>
            <div class=""k form-datetime"">
                <div class=""form-group"">
                    <div class='input-group date' id='datepicker-startday'>
                        <input type='text' class=""form-control"" id=""fromday"" />
                        <span class=""input-group-addon"">
                            <span class=""glyphicon glyphicon-calendar""></span>
                        </span>
                    </div>
                </div>
            </div>
            <span class=""k t t-form-day"">đến ngày: </span>
            <div class=""k form-datetime"">
                <div class=""form-group"">
                    <div class='input-group date' id='datepicker-endday'>
                        <input type='text' class=");
            WriteLiteral(@"""form-control"" id=""today"" />
                        <span class=""input-group-addon"">
                            <span class=""glyphicon glyphicon-calendar""></span>
                        </span>
                    </div>
                </div>
            </div>

            <div class=""k f-search-ft"">
                <input class=""k search-ft"" id=""search-box"" onkeyup=""filterDisByBox()"" type=""text"">
                <i class=""fa fa-search bnt-search"" aria-hidden=""true""></i>
            </div>

        </div>
        <div class=""k main-body""id=""form-body-dis"">
            <div class=""k row-item row-item-main"" >
                <span class=""k t text-item small-item item-main"">STT</span>
                <span class=""k t text-item small-item item-main"">Mã ĐV</span>
                <span class=""k t text-item big-item item-main"">Tên ĐV</span>
                <span class=""k t text-item item item-main"">Ngày vào Đảng</span>
                <span class=""k t text-item item item-main"">Ngày kỉ luật</");
            WriteLiteral(@"span>
                <span class=""k t text-item big-item item-main"">Nội dung</span>
                <span class=""k t text-item small-item item-main"">Cập nhật</span>
            </div>
            <span class=""k t t-nodata"" id=""tab-nodata"">KHÔNG CÓ DỮ LIỆU</span>
");
            EndContext();
            BeginContext(3729, 18, true);
            WriteLiteral("        </div>\r\n\r\n");
            EndContext();
            BeginContext(3779, 2345, true);
            WriteLiteral(@"        <div class=""modal fade"" id=""modaladddesciption"" role=""dialog"">
            <div class=""modal-dialog"">
                <!-- Modal content-->
                <div class=""modal-content"">

                    <div class=""modal-header"">
                        <button type=""button"" class=""close"" data-dismiss=""modal"">&times;</button>
                        <h4 class=""modal-title"">Khai báo kỷ luật</h4>
                    </div>
                    <div class=""k modal-body"">
                        <div class=""k dl-sm-it"">
                            <span class=""k t dl-name-fml"">Đảng viên: </span>
                            <select class=""k dl-sl-fml"" id=""sl-user"">
                            </select>
                        </div>
                        <div class=""k dl-sm-it"">
                            <span class=""k t dl-name-fml"">Kỷ luật: </span>
                            <input class=""k dl-input-fml"" id=""disname"" type=""text"" />
                        </div>
                 ");
            WriteLiteral(@"       <div class=""k dl-sm-it"">
                            <span class=""k t dl-name-fml"">Đơn vị: </span>
                            <input class=""k dl-input-fml"" id=""orgadddis"" type=""text"" />
                        </div>
                        <div class=""k dl-sm-it"">
                            <span class=""k t dl-name-fml"" id="""">Thời gian kỉ luật: </span>
                            <div class=""form-group"">
                                <div class='input-group date' id='datepicker-add-des'>
                                    <input type='text' class=""form-control"" id=""timedisaddnew"" />
                                    <span class=""input-group-addon"">
                                        <span class=""glyphicon glyphicon-calendar""></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class=""k dl-sm-it"">
                            <span class=""k t dl");
            WriteLiteral(@"-name-fml"">Ghi chú: </span>
                            <textarea class=""k dl-input-fml note-bonus"" id=""notedisaddnew"" type=""text""></textarea>
                        </div>
                        <span class=""k t err-validate"" id=""err-add-discipline"">**Vui lòng điền đầy đủ thông tin</span>
");
            EndContext();
            BeginContext(6221, 580, true);
            WriteLiteral(@"                    </div>
                    <div class=""modal-footer"">
                        <button type=""button"" class=""k btn btn-default bnt-close-form"" data-dismiss=""modal"">
                            Đóng
                        </button>
                        <span class=""k dl-bnt-save"" onclick=""validateDis()"">
                            <i class=""fa fa-paper-plane-o"" aria-hidden=""true""></i>
                            Thêm mới
                        </span>
                    </div>
                </div>

            </div>
        </div>

");
            EndContext();
            BeginContext(6832, 2126, true);
            WriteLiteral(@"        <div class=""modal fade"" id=""modalupdatedesciption"" role=""dialog"">
            <div class=""modal-dialog"">
                <!-- Modal content-->
                <div class=""modal-content"">
                    <div class=""modal-header"">
                        <button type=""button"" class=""close"" data-dismiss=""modal"">&times;</button>
                        <h4 class=""modal-title"">Cập nhật kỷ luật</h4>
                    </div>
                    <div class=""k modal-body"">
                        <div class=""k dl-sm-it"">
                            <span class=""k t dl-name-fml"">Kỷ luật: </span>
                            <input class=""k dl-input-fml"" id=""namedisciplineupdate"" type=""text"" />
                        </div>
                        <div class=""k dl-sm-it"">
                            <span class=""k t dl-name-fml"">Đơn vị: </span>
                            <input class=""k dl-input-fml"" id=""orgdisciplineupdate"" type=""text"" />
                        </div>
                 ");
            WriteLiteral(@"       <div class=""k dl-sm-it"">
                            <span class=""k t dl-name-fml"" id="""">Thời gian kỉ luật: </span>
                            <div class=""form-group"">
                                <div class='input-group date' id='datepicker-update-discipline'>
                                    <input type='text' class=""form-control"" id=""timeupdatediscipline"" />
                                    <span class=""input-group-addon"">
                                        <span class=""glyphicon glyphicon-calendar""></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class=""k dl-sm-it"">
                            <span class=""k t dl-name-fml"">Ghi chú: </span>
                            <textarea class=""k dl-input-fml note-bonus"" id=""notedisciplineupdate"" type=""text""></textarea>
                        </div>
                        <span class=""k t err-");
            WriteLiteral("validate\" id=\"err-update-discipline\">**Vui lòng điền đầy đủ thông tin</span>\r\n");
            EndContext();
            BeginContext(9062, 605, true);
            WriteLiteral(@"                    </div>
                    <div class=""modal-footer"">
                        <button type=""button"" class=""k btn btn-default bnt-close-form"" data-dismiss=""modal"">
                            Đóng
                        </button>
                        <span class=""k dl-bnt-save"" onclick=""validateDiscipline()"">
                            <i class=""fa fa-paper-plane-o"" aria-hidden=""true""></i>
                            Cập nhật
                        </span>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>
");
            EndContext();
            DefineSection("Script", async() => {
                BeginContext(9683, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(9689, 54, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "1b9d5f238c274cdb81f2d5f4806f32ca", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(9743, 2, true);
                WriteLiteral("\r\n");
                EndContext();
            }
            );
            BeginContext(9748, 2, true);
            WriteLiteral("\r\n");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591