import * as tslib_1 from "tslib";
import {Component, Input, ViewChild, ViewContainerRef} from '@angular/core';

let WidgetContainerComponent = class WidgetContainerComponent {
};
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], WidgetContainerComponent.prototype, "title", void 0);
tslib_1.__decorate([
    Input(),
    tslib_1.__metadata("design:type", String)
], WidgetContainerComponent.prototype, "icon", void 0);
tslib_1.__decorate([
    ViewChild('container', {read: ViewContainerRef, static: true}),
    tslib_1.__metadata("design:type", ViewContainerRef)
], WidgetContainerComponent.prototype, "embeddedContainer", void 0);
WidgetContainerComponent = tslib_1.__decorate([
    Component({
        selector: 'widget-container',
        template: "<mat-card class=\"dark-blue-100\">\n    <mat-card-header>\n        <mat-icon mat-card-avatar>{{icon || 'dashboard'}}</mat-icon>\n        <mat-card-title>{{title}}</mat-card-title>\n    </mat-card-header>\n    <mat-divider></mat-divider>\n    <mat-card-content>\n        <ng-container #container></ng-container>\n    </mat-card-content>\n</mat-card>\n",
        styles: ["mat-icon.mat-card-avatar{width:30px;height:30px;font-size:30px}mat-card-title{padding-top:5px!important}"]
    })
], WidgetContainerComponent);
export {WidgetContainerComponent};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWNvbnRhaW5lci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1wYXRpZW50LTEuMi4wLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvd2lkZ2V0LWNvbnRhaW5lci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWUsS0FBSyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQU8zRixJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF3QjtDQVFwQyxDQUFBO0FBTkc7SUFEQyxLQUFLLEVBQUU7O3VEQUNNO0FBRWQ7SUFEQyxLQUFLLEVBQUU7O3NEQUNLO0FBR2I7SUFEQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixFQUFHLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztzQ0FDL0MsZ0JBQWdCO21FQUFDO0FBUDNCLHdCQUF3QjtJQUxwQyxTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUMsa0JBQWtCO1FBQzNCLDBXQUFnRDs7S0FFbkQsQ0FBQztHQUNXLHdCQUF3QixDQVFwQztTQVJZLHdCQUF3QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6J3dpZGdldC1jb250YWluZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93aWRnZXQtY29udGFpbmVyLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi93aWRnZXQtY29udGFpbmVyLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgV2lkZ2V0Q29udGFpbmVyQ29tcG9uZW50IHtcbiAgICBASW5wdXQoKVxuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgQElucHV0KClcbiAgICBpY29uOiBzdHJpbmc7XG5cbiAgICBAVmlld0NoaWxkKCdjb250YWluZXInLCB7IHJlYWQ6IFZpZXdDb250YWluZXJSZWYsICBzdGF0aWM6IHRydWUgfSlcbiAgICBlbWJlZGRlZENvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZjtcbn1cbiJdfQ==
