import * as tslib_1 from "tslib";
import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {DATE_FORMAT, SERVER_API_URL_CONFIG} from "@lamis/web-core";
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

var moment = moment_;
var ReportService = /** @class */ (function () {
    function ReportService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/reporting';
    }

    ReportService.prototype.artSummary = function (reportingPeriod, id, today) {
        var params = new HttpParams();
        params = params.append('reportingPeriod', moment(reportingPeriod).format(DATE_FORMAT));
        params = params.append("id", id.toString());
        params = params.append("today", today.toString());
        return this.http.get(this.resourceUrl + "/art-summary", {params: params, responseType: 'blob'});
    };
    ReportService.prototype.patientLineList = function (params) {
        params.dateCurrentStatusBegin = params.dateCurrentStatusBegin != null && params.dateCurrentStatusBegin.isValid() ? params.dateCurrentStatusBegin.format(DATE_FORMAT) : null;
        params.dateCurrentStatusEnd = params.dateCurrentStatusEnd != null && params.dateCurrentStatusEnd.isValid() ? params.dateCurrentStatusEnd.format(DATE_FORMAT) : null;
        params.dateLastViralLoadBegin = params.dateLastViralLoadBegin != null && params.dateLastViralLoadBegin.isValid() ? params.dateLastViralLoadBegin.format(DATE_FORMAT) : null;
        params.dateLastViralLoadEnd = params.dateLastViralLoadEnd != null && params.dateLastViralLoadEnd.isValid() ? params.dateLastViralLoadEnd.format(DATE_FORMAT) : null;
        params.dateRegistrationBegin = params.dateRegistrationBegin != null && params.dateRegistrationBegin.isValid() ? params.dateRegistrationBegin.format(DATE_FORMAT) : null;
        params.dateRegistrationEnd = params.dateRegistrationEnd != null && params.dateRegistrationEnd.isValid() ? params.dateRegistrationEnd.format(DATE_FORMAT) : null;
        params.dateStartBegin = params.dateStartBegin != null && params.dateStartBegin.isValid() ? params.dateStartBegin.format(DATE_FORMAT) : null;
        params.dateStartEnd = params.dateStartEnd != null && params.dateStartEnd.isValid() ? params.dateStartEnd.format(DATE_FORMAT) : null;
        return this.http.post(this.resourceUrl + "/patient-line-list", params, {responseType: 'blob'});
    };
    ReportService.prototype.getRegimenTypes = function () {
        return this.http.get(this.resourceUrl + "/regimen-types");
    };
    ReportService.prototype.getStates = function () {
        return this.http.get('/api/states');
    };
    ReportService.prototype.getLgasByState = function (id) {
        return this.http.get("/api/provinces/state/" + id);
    };
    ReportService.prototype.getActiveFacility = function () {
        return this.http.get('/api/facilities/active');
    };
    ReportService.prototype.listFacilities = function () {
        return this.http.get(this.resourceUrl + "/list-facilities");
    };
    ReportService.prototype.download = function (name) {
        return this.http.get(this.resourceUrl + "/download/" + name, {responseType: 'blob'});
    };
    ReportService.prototype.listFiles = function () {
        return this.http.get(this.resourceUrl + "/list-files");
    };
    ReportService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    ReportService.ngInjectableDef = i0.ɵɵdefineInjectable({
        factory: function ReportService_Factory() {
            return new ReportService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
        }, token: ReportService, providedIn: "root"
    });
    ReportService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], ReportService);
    return ReportService;
}());
export {ReportService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1yZXBvcnRpbmctMS4wLjAvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvcmVwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUd6RixPQUFPLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQzs7OztBQUVsQyxJQUFNLE1BQU0sR0FBRyxPQUFPLENBQUM7QUFLdkI7SUFHSSx1QkFBb0IsSUFBZ0IsRUFBeUMsU0FBNkI7UUFBdEYsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUF5QyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUZuRyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsZ0JBQWdCLENBQUM7SUFDbkUsQ0FBQztJQUVELGtDQUFVLEdBQVYsVUFBVyxlQUFxQixFQUFFLEVBQVUsRUFBRSxLQUFjO1FBQ3hELElBQUksTUFBTSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUM7UUFDOUIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUM1QyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRSxD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QUFJLENBQUMsR0FBRyxDQUFRLGFBQWEsQ0FBQyxDQUFBO0lBQzlDLENBQUM7SUFFRCxzQ0FBYyxHQUFkLFVBQWUsRUFBRTtRQUNiLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQVEsMEJBQXdCLEVBQUksQ0FBQyxDQUFBO0lBQzdELENBQUM7SUFFRCx5Q0FBaUIsR0FBakI7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFXLHdCQUF3QixDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVELHNDQUFjLEdBQWQ7UUFDSSxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFnQixJQUFJLENBQUMsV0FBVyxxQkFBa0IsQ0FBQyxDQUFBO0lBQzNFLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsSUFBWTtRQUNqQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFJLElBQUksQ0FBQyxXQUFXLGtCQUFhLElBQU0sRUFBRSxFQUFDLFlBQVksRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFBO0lBQ3hGLENBQUM7SUFFRCxpQ0FBUyxHQUFUO1FBQ0ksT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBYyxJQUFJLENBQUMsV0FBVyxnQkFBYSxDQUFDLENBQUE7SUFDcEUsQ0FBQzs7Z0JBbkR5QixVQUFVO2dEQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztJQUgxRCxhQUFhO1FBSHpCLFVBQVUsQ0FBQztZQUNSLFVBQVUsRUFBRSxNQUFNO1NBQ3JCLENBQUM7UUFJeUMsbUJBQUEsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUE7aURBQTFDLFVBQVU7T0FIM0IsYUFBYSxDQXVEekI7d0JBbkVEO0NBbUVDLEFBdkRELElBdURDO1NBdkRZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cFBhcmFtcyB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgREFURV9GT1JNQVQsIFNFUlZFUl9BUElfVVJMX0NPTkZJRywgU2VydmVyQXBpVXJsQ29uZmlnIH0gZnJvbSBcIkBsYW1pcy93ZWItY29yZVwiO1xuaW1wb3J0IHsgRmFjaWxpdHkgfSBmcm9tIFwiLi4vY29tcG9uZW50cy9hcnQtc3VtbWFyeS5jb21wb25lbnRcIjtcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuXG5jb25zdCBtb21lbnQgPSBtb21lbnRfO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFJlcG9ydFNlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KFNFUlZFUl9BUElfVVJMX0NPTkZJRykgcHJpdmF0ZSBzZXJ2ZXJVcmw6IFNlcnZlckFwaVVybENvbmZpZykge1xuICAgICAgICB0aGlzLnJlc291cmNlVXJsID0gc2VydmVyVXJsLlNFUlZFUl9BUElfVVJMICsgJy9hcGkvcmVwb3J0aW5nJztcbiAgICB9XG5cbiAgICBhcnRTdW1tYXJ5KHJlcG9ydGluZ1BlcmlvZDogRGF0ZSwgaWQ6IG51bWJlciwgdG9kYXk6IGJvb2xlYW4pIHtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5ldyBIdHRwUGFyYW1zKCk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoJ3JlcG9ydGluZ1BlcmlvZCcsIG1vbWVudChyZXBvcnRpbmdQZXJpb2QpLmZvcm1hdChEQVRFX0ZPUk1BVCkpO1xuICAgICAgICBwYXJhbXMgPSBwYXJhbXMuYXBwZW5kKFwiaWRcIiwgaWQudG9TdHJpbmcoKSk7XG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcy5hcHBlbmQoXCJ0b2RheVwiLCB0b2RheS50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vYXJ0LXN1bW1hcnlgLCB7cGFyYW1zLCByZXNwb25zZVR5cGU6ICdibG9iJ30pXG4gICAgfVxuXG4gICAgcGF0aWVudExpbmVMaXN0KHBhcmFtczogYW55KSB7XG4gICAgICAgIHBhcmFtcy5kYXRlQ3VycmVudFN0YXR1c0JlZ2luID0gcGFyYW1zLmRhdGVDdXJyZW50U3RhdHVzQmVnaW4gIT0gbnVsbCAmJiBwYXJhbXMuZGF0ZUN1cnJlbnRTdGF0dXNCZWdpbi5pc1ZhbGlkKCkgPyBwYXJhbXMuZGF0ZUN1cnJlbnRTdGF0dXNCZWdpbi5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbDtcbiAgICAgICAgcGFyYW1zLmRhdGVDdXJyZW50U3RhdHVzRW5kID0gcGFyYW1zLmRhdGVDdXJyZW50U3RhdHVzRW5kICE9IG51bGwgJiYgcGFyYW1zLmRhdGVDdXJyZW50U3RhdHVzRW5kLmlzVmFsaWQoKSA/IHBhcmFtcy5kYXRlQ3VycmVudFN0YXR1c0VuZC5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbDtcbiAgICAgICAgcGFyYW1zLmRhdGVMYXN0VmlyYWxMb2FkQmVnaW4gPSBwYXJhbXMuZGF0ZUxhc3RWaXJhbExvYWRCZWdpbiAhPSBudWxsICYmIHBhcmFtcy5kYXRlTGFzdFZpcmFsTG9hZEJlZ2luLmlzVmFsaWQoKSA/IHBhcmFtcy5kYXRlTGFzdFZpcmFsTG9hZEJlZ2luLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsO1xuICAgICAgICBwYXJhbXMuZGF0ZUxhc3RWaXJhbExvYWRFbmQgPSBwYXJhbXMuZGF0ZUxhc3RWaXJhbExvYWRFbmQgIT0gbnVsbCAmJiBwYXJhbXMuZGF0ZUxhc3RWaXJhbExvYWRFbmQuaXNWYWxpZCgpID8gcGFyYW1zLmRhdGVMYXN0VmlyYWxMb2FkRW5kLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsO1xuICAgICAgICBwYXJhbXMuZGF0ZVJlZ2lzdHJhdGlvbkJlZ2luID0gcGFyYW1zLmRhdGVSZWdpc3RyYXRpb25CZWdpbiAhPSBudWxsICYmIHBhcmFtcy5kYXRlUmVnaXN0cmF0aW9uQmVnaW4uaXNWYWxpZCgpID8gcGFyYW1zLmRhdGVSZWdpc3RyYXRpb25CZWdpbi5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbDtcbiAgICAgICAgcGFyYW1zLmRhdGVSZWdpc3RyYXRpb25FbmQgPSBwYXJhbXMuZGF0ZVJlZ2lzdHJhdGlvbkVuZCAhPSBudWxsICYmIHBhcmFtcy5kYXRlUmVnaXN0cmF0aW9uRW5kLmlzVmFsaWQoKSA/IHBhcmFtcy5kYXRlUmVnaXN0cmF0aW9uRW5kLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsO1xuICAgICAgICBwYXJhbXMuZGF0ZVN0YXJ0QmVnaW4gPSBwYXJhbXMuZGF0ZVN0YXJ0QmVnaW4gIT0gbnVsbCAmJiBwYXJhbXMuZGF0ZVN0YXJ0QmVnaW4uaXNWYWxpZCgpID8gcGFyYW1zLmRhdGVTdGFydEJlZ2luLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsO1xuICAgICAgICBwYXJhbXMuZGF0ZVN0YXJ0RW5kID0gcGFyYW1zLmRhdGVTdGFydEVuZCAhPSBudWxsICYmIHBhcmFtcy5kYXRlU3RhcnRFbmQuaXNWYWxpZCgpID8gcGFyYW1zLmRhdGVTdGFydEVuZC5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke3RoaXMucmVzb3VyY2VVcmx9L3BhdGllbnQtbGluZS1saXN0YCwgcGFyYW1zLCB7cmVzcG9uc2VUeXBlOiAnYmxvYid9KVxuICAgIH1cblxuICAgIGdldFJlZ2ltZW5UeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8YW55W10+KGAke3RoaXMucmVzb3VyY2VVcmx9L3JlZ2ltZW4tdHlwZXNgKVxuICAgIH1cblxuXG4gICAgZ2V0U3RhdGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oJy9hcGkvc3RhdGVzJylcbiAgICB9XG5cbiAgICBnZXRMZ2FzQnlTdGF0ZShpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oYC9hcGkvcHJvdmluY2VzL3N0YXRlLyR7aWR9YClcbiAgICB9XG5cbiAgICBnZXRBY3RpdmVGYWNpbGl0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RmFjaWxpdHk+KCcvYXBpL2ZhY2lsaXRpZXMvYWN0aXZlJylcbiAgICB9XG5cbiAgICBsaXN0RmFjaWxpdGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8RmFjaWxpdHlbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vbGlzdC1mYWNpbGl0aWVzYClcbiAgICB9XG5cbiAgICBkb3dubG9hZChuYW1lOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEJsb2I+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vZG93bmxvYWQvJHtuYW1lfWAsIHtyZXNwb25zZVR5cGU6ICdibG9iJ30pXG4gICAgfVxuXG4gICAgbGlzdEZpbGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxzdHJpbmdbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vbGlzdC1maWxlc2ApXG4gICAgfVxufVxuIl19
