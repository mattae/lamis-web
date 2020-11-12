import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DATE_FORMAT, SERVER_API_URL_CONFIG} from '@lamis/web-core';
import {map} from 'rxjs/operators';
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

const moment = moment_;
let EacService = class EacService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/eacs';
    }

    create(eac) {
        const copy = this.convertDateFromClient(eac);
        return this.http
            .post(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    update(eac) {
        const copy = this.convertDateFromClient(eac);
        return this.http
            .put(this.resourceUrl, copy, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    find(id) {
        return this.http
            .get(`${this.resourceUrl}/${id}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    findByUuid(id) {
        return this.http
            .get(`${this.resourceUrl}/by-uuid/${id}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    delete(id) {
        return this.http.delete(`${this.resourceUrl}/${id}`, {observe: 'response'});
    }

    getLatestByPatient(uuid) {
        return this.http
            .get(`${this.resourceUrl}/patient/${uuid}`, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    getLatestViralLoadByPatient(id) {
        return this.http
            .get(`${this.resourceUrl}/patient/${id}/viral-load-result`, {observe: 'response'})
            .pipe(map((res) => {
                if (res.body) {
                    res.body.laboratory.dateReported = res.body.laboratory.dateReported != null ?
                        moment(res.body.laboratory.dateReported) : null;
                }
                return res;
            }));
    }

    convertDateFromClient(eac) {
        const copy = Object.assign({}, eac, {
            dateEac1: eac.dateEac1 != null && eac.dateEac1.isValid() ? eac.dateEac1.format(DATE_FORMAT) : null,
            dateEac2: eac.dateEac2 != null && eac.dateEac2.isValid() ? eac.dateEac2.format(DATE_FORMAT) : null,
            dateEac3: eac.dateEac3 != null && eac.dateEac3.isValid() ? eac.dateEac3.format(DATE_FORMAT) : null,
            dateSampleCollected: eac.dateSampleCollected != null && eac.dateSampleCollected.isValid() ? eac.dateSampleCollected.format(DATE_FORMAT) : null,
            dateLastViralLoad: eac.dateLastViralLoad != null && eac.dateLastViralLoad.isValid() ? eac.dateLastViralLoad.format(DATE_FORMAT) : null,
        });
        return copy;
    }

    convertDateFromServer(res) {
        if (res.body) {
            res.body.dateLastViralLoad = res.body.dateLastViralLoad != null ? moment(res.body.dateLastViralLoad) : null;
            res.body.dateEac1 = res.body.dateEac1 != null ? moment(res.body.dateEac1) : null;
            res.body.dateEac2 = res.body.dateEac2 != null ? moment(res.body.dateEac2) : null;
            res.body.dateEac3 = res.body.dateEac3 != null ? moment(res.body.dateEac3) : null;
            res.body.dateSampleCollected = res.body.dateSampleCollected != null ? moment(res.body.dateSampleCollected) : null;
        }
        return res;
    }
};
EacService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
EacService.ngInjectableDef = i0.ɵɵdefineInjectable({
    factory: function EacService_Factory() {
        return new EacService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
    }, token: EacService, providedIn: "root"
});
EacService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    }),
    tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
    tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
], EacService);
export {EacService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWFjLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS4xLjMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvZWFjLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUd6RixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7Ozs7QUFHbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCLElBQWEsVUFBVSxHQUF2QixNQUFhLFVBQVU7SUFHbkIsWUFBc0IsSUFBZ0IsRUFBeUMsU0FBNkI7UUFBdEYsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUF5QyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUZyRyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO0lBQzlELENBQUM7SUFFRCxNQUFNLENBQUMsR0FBUTtRQUNYLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QyxPQUFPLElBQUksQ0FBQyxJQUFJO2FBQ1gsSUFBSSxDQUFNLElBQUksQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBQyxDQUFDO2FBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFzQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFD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bmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBSZXNwb25zZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IERBVEVfRk9STUFULCBTRVJWRVJfQVBJX1VSTF9DT05GSUcsIFNlcnZlckFwaVVybENvbmZpZyB9IGZyb20gJ0BsYW1pcy93ZWItY29yZSc7XG5pbXBvcnQgeyBFQUMgfSBmcm9tICcuLi9tb2RlbC9jbGluaWMubW9kZWwnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgbW9tZW50XyBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgTW9tZW50IH0gZnJvbSAnbW9tZW50JztcblxuY29uc3QgbW9tZW50ID0gbW9tZW50XztcblxuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEVhY1NlcnZpY2Uge1xuICAgIHB1YmxpYyByZXNvdXJjZVVybCA9ICcnO1xuXG4gICAgY29uc3RydWN0b3IocHJvdGVjdGVkIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoU0VSVkVSX0FQSV9VUkxfQ09ORklHKSBwcml2YXRlIHNlcnZlclVybDogU2VydmVyQXBpVXJsQ29uZmlnKSB7XG4gICAgICAgIHRoaXMucmVzb3VyY2VVcmwgPSBzZXJ2ZXJVcmwuU0VSVkVSX0FQSV9VUkwgKyAnL2FwaS9lYWNzJztcbiAgICB9XG5cbiAgICBjcmVhdGUoZWFjOiBFQUMpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxFQUM+PiB7XG4gICAgICAgIGNvbnN0IGNvcHkgPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudChlYWMpO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAucG9zdDxFQUM+KHRoaXMucmVzb3VyY2VVcmwsIGNvcHksIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8RUFDPikgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIHVwZGF0ZShlYWM6IEVBQyk6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPEVBQz4+IHtcbiAgICAgICAgY29uc3QgY29weSA9IHRoaXMuY29udmVydERhdGVGcm9tQ2xpZW50KGVhYyk7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wdXQ8RUFDPih0aGlzLnJlc291cmNlVXJsLCBjb3B5LCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogSHR0cFJlc3BvbnNlPEVBQz4pID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBmaW5kKGlkOiBudW1iZXIpOiBPYnNlcnZhYmxlPEh0dHBSZXNwb25zZTxFQUM+PiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8RUFDPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8RUFDPikgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIGZpbmRCeVV1aWQoaWQ6IHN0cmluZyk6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPEVBQz4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldDxFQUM+KGAke3RoaXMucmVzb3VyY2VVcmx9L2J5LXV1aWQvJHtpZH1gLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogSHR0cFJlc3BvbnNlPEVBQz4pID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8YW55PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgZ2V0TGF0ZXN0QnlQYXRpZW50KHV1aWQ6IHN0cmluZyk6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPEVBQz4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cFxuICAgICAgICAgICAgLmdldDxFQUM+KGAke3RoaXMucmVzb3VyY2VVcmx9L3BhdGllbnQvJHt1dWlkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8RUFDPikgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIGdldExhdGVzdFZpcmFsTG9hZEJ5UGF0aWVudChpZDogbnVtYmVyKTogT2JzZXJ2YWJsZTxIdHRwUmVzcG9uc2U8YW55Pj4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PGFueT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcGF0aWVudC8ke2lkfS92aXJhbC1sb2FkLXJlc3VsdGAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBIdHRwUmVzcG9uc2U8YW55PikgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChyZXMuYm9keSkge1xuICAgICAgICAgICAgICAgICAgICByZXMuYm9keS5sYWJvcmF0b3J5LmRhdGVSZXBvcnRlZCA9IHJlcy5ib2R5LmxhYm9yYXRvcnkuZGF0ZVJlcG9ydGVkICE9IG51bGwgP1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50KHJlcy5ib2R5LmxhYm9yYXRvcnkuZGF0ZVJlcG9ydGVkKSA6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29udmVydERhdGVGcm9tQ2xpZW50KGVhYzogRUFDKTogRUFDIHtcbiAgICAgICAgY29uc3QgY29weTogRUFDID0gT2JqZWN0LmFzc2lnbih7fSwgZWFjLCB7XG4gICAgICAgICAgICBkYXRlRWFjMTogZWFjLmRhdGVFYWMxICE9IG51bGwgJiYgZWFjLmRhdGVFYWMxLmlzVmFsaWQoKSA/IGVhYy5kYXRlRWFjMS5mb3JtYXQoREFURV9GT1JNQVQpIDogbnVsbCxcbiAgICAgICAgICAgIGRhdGVFYWMyOiBlYWMuZGF0ZUVhYzIgIT0gbnVsbCAmJiBlYWMuZGF0ZUVhYzIuaXNWYWxpZCgpID8gZWFjLmRhdGVFYWMyLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUVhYzM6IGVhYy5kYXRlRWFjMyAhPSBudWxsICYmIGVhYy5kYXRlRWFjMy5pc1ZhbGlkKCkgPyBlYWMuZGF0ZUVhYzMuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgICAgICBkYXRlU2FtcGxlQ29sbGVjdGVkOiBlYWMuZGF0ZVNhbXBsZUNvbGxlY3RlZCAhPSBudWxsICYmIGVhYy5kYXRlU2FtcGxlQ29sbGVjdGVkLmlzVmFsaWQoKSA/IGVhYy5kYXRlU2FtcGxlQ29sbGVjdGVkLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgZGF0ZUxhc3RWaXJhbExvYWQ6IGVhYy5kYXRlTGFzdFZpcmFsTG9hZCAhPSBudWxsICYmIGVhYy5kYXRlTGFzdFZpcmFsTG9hZC5pc1ZhbGlkKCkgPyBlYWMuZGF0ZUxhc3RWaXJhbExvYWQuZm9ybWF0KERBVEVfRk9STUFUKSA6IG51bGwsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29weTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgY29udmVydERhdGVGcm9tU2VydmVyKHJlczogSHR0cFJlc3BvbnNlPEVBQz4pOiBIdHRwUmVzcG9uc2U8RUFDPiB7XG4gICAgICAgIGlmIChyZXMuYm9keSkge1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZUxhc3RWaXJhbExvYWQgPSByZXMuYm9keS5kYXRlTGFzdFZpcmFsTG9hZCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVMYXN0VmlyYWxMb2FkKSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5kYXRlRWFjMSA9IHJlcy5ib2R5LmRhdGVFYWMxICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZUVhYzEpIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LmRhdGVFYWMyID0gcmVzLmJvZHkuZGF0ZUVhYzIgIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5kYXRlRWFjMikgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZUVhYzMgPSByZXMuYm9keS5kYXRlRWFjMyAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVFYWMzKSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5kYXRlU2FtcGxlQ29sbGVjdGVkID0gcmVzLmJvZHkuZGF0ZVNhbXBsZUNvbGxlY3RlZCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5LmRhdGVTYW1wbGVDb2xsZWN0ZWQpIDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxufVxuIl19