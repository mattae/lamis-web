import * as tslib_1 from "tslib";
import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {DATE_FORMAT, SERVER_API_URL_CONFIG} from '@lamis/web-core';
import {map} from 'rxjs/operators';
import * as moment_ from 'moment';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "@lamis/web-core";

var moment = moment_;
var ClinicService = /** @class */ (function () {
    function ClinicService(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/clinics';
    }

    ClinicService.prototype.create = function (vm) {
        var _this = this;
        vm['clinic'] = this.convertDateFromClient(vm.clinic);
        vm['oiScreened'] = !!vm.oiList ? 'Yes' : 'No';
        vm['adrScreened'] = !!vm.adrList ? 'Yes' : 'No';
        return this.http
            .post(this.resourceUrl, vm, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ClinicService.prototype.update = function (vm) {
        var _this = this;
        vm['clinic'] = this.convertDateFromClient(vm.clinic);
        vm['oiScreened'] = !!vm.oiList ? 'Yes' : 'No';
        vm['adrScreened'] = !!vm.adrList ? 'Yes' : 'No';
        return this.http
            .put(this.resourceUrl, vm, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ClinicService.prototype.find = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ClinicService.prototype.findByUuid = function (id) {
        var _this = this;
        return this.http
            .get(this.resourceUrl + "/by-uuid/" + id, {observe: 'response'})
            .pipe(map(function (res) {
                return _this.convertDateFromServer(res);
            }));
    };
    ClinicService.prototype.delete = function (id) {
        return this.http.delete(this.resourceUrl + "/" + id, {observe: 'response'});
    };
    ClinicService.prototype.getVisitDatesByPatient = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/visit-dates")
            .pipe(map(function (res) {
                res.forEach(function (d) {
                    return moment(d);
                });
                return res;
            }));
    };
    ClinicService.prototype.getPatient = function (id) {
        return this.http.get("/api/patients/by-uuid/" + id, {observe: 'body'})
            .pipe(map(function (res) {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                    res.dateBirth = res.dateBirth != null ? moment(res.dateBirth) : null;
                }
                return res;
            }));
    };
    ClinicService.prototype.getRegimenLines = function () {
        return this.http.get(this.resourceUrl + "/regimen-types");
    };
    ClinicService.prototype.getRegimenByLine = function (id) {
        return this.http.get(this.resourceUrl + "/regimens/regimen-type/" + id);
    };
    ClinicService.prototype.adverseDrugReactions = function () {
        return this.http.get(this.resourceUrl + "/adverse-drug-reactions");
    };
    ClinicService.prototype.opportunisticInfections = function () {
        return this.http.get(this.resourceUrl + "/opportunistic-infections");
    };
    ClinicService.prototype.adheres = function () {
        return this.http.get(this.resourceUrl + "/adheres");
    };
    ClinicService.prototype.regimes = function (regimenType) {
        return this.http.get(this.resourceUrl + "/regimens/" + regimenType);
    };
    ClinicService.prototype.latestVisit = function (patientId) {
        return this.http.get(this.resourceUrl + "/patient/" + patientId + "/latest");
    };
    ClinicService.prototype.getOpportunisticInfectionsByClinic = function (clinicId) {
        return this.http.get(this.resourceUrl + "/" + clinicId + "/opportunistic-infections");
    };
    ClinicService.prototype.getAdverseDrugReactionsByClinic = function (clinicId) {
        return this.http.get(this.resourceUrl + "/" + clinicId + "/adverse-drug-reactions", {observe: 'response'});
    };
    ClinicService.prototype.getAdhereByClinic = function (clinicId) {
        return this.http.get(this.resourceUrl + "/" + clinicId + "/adheres");
    };
    ClinicService.prototype.convertDateFromClient = function (clinic) {
        var copy = Object.assign({}, clinic, {
            dateVisit: clinic.dateVisit != null && clinic.dateVisit.isValid() ? clinic.dateVisit.format(DATE_FORMAT) : null,
            lmp: clinic.lmp != null && clinic.lmp.isValid() ? clinic.lmp.format(DATE_FORMAT) : null,
            nextAppointment: clinic.nextAppointment != null && clinic.nextAppointment.isValid() ? clinic.nextAppointment.format(DATE_FORMAT) : null,
            pregnant: clinic.pregnancyStatus != null && clinic.pregnancyStatus === 2,
            breastfeeding: clinic.pregnancyStatus != null && clinic.pregnancyStatus === 3,
            bp: clinic.bp1 > 0 && clinic.bp2 > 0 ? clinic.bp1 + '/' + clinic.bp2 : null
        });
        return copy;
    };
    ClinicService.prototype.convertDateFromServer = function (res) {
        if (res.body) {
            res.body.nextAppointment = res.body.nextAppointment != null ? moment(res.body.nextAppointment) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment(res.body.dateVisit) : null;
            res.body.lmp = res.body.lmp != null ? moment(res.body.lmp) : null;
            res.body.pregnancyStatus = res.body.pregnant ? 2 : res.body.breastfeeding ? 3 : 1;
            if (res.body.bp) {
                var parts = res.body.bp.split('/');
                res.body.bp1 = parseInt(parts[0]);
                res.body.bp2 = parts.length === 2 ? parseInt(parts[1]) : null;
            }
        }
        return res;
    };
    ClinicService.prototype.convertDateArrayFromServer = function (res) {
        if (res.body) {
            res.body.forEach(function (clinic) {
                clinic.dateVisit = clinic.dateVisit != null ? moment(clinic.dateVisit) : null;
                clinic.lmp = clinic.lmp != null ? moment(clinic.lmp) : null;
                clinic.nextAppointment = clinic.nextAppointment != null ? moment(clinic.nextAppointment) : null;
                clinic.pregnancyStatus = clinic.pregnant ? 2 : clinic.breastfeeding ? 3 : 1;
            });
        }
        return res;
    };
    ClinicService.ctorParameters = function () {
        return [
            {type: HttpClient},
            {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
        ];
    };
    ClinicService.ngInjectableDef = i0.ɵɵdefineInjectable({
        factory: function ClinicService_Factory() {
            return new ClinicService(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.SERVER_API_URL_CONFIG));
        }, token: ClinicService, providedIn: "root"
    });
    ClinicService = tslib_1.__decorate([
        Injectable({providedIn: 'root'}),
        tslib_1.__param(1, Inject(SERVER_API_URL_CONFIG)),
        tslib_1.__metadata("design:paramtypes", [HttpClient, Object])
    ], ClinicService);
    return ClinicService;
}());
export {ClinicService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS4xLjMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY2xpbmljLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7Ozs7QUFHbEMsSUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCO0lBR0ksdUJBQXNCLElBQWdCLEVBQXlDLFNBQTZCO1FBQXRGLFNBQUksR0FBSixJQUFJLENBQVk7UUFBeUMsY0FBUyxHQUFULFNBQVMsQ0FBb0I7UUFGckcsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFHcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztJQUNqRSxDQUFDO0lBRUQsOEJBQU0sR0FBTixVQUFPLEVBQVk7UUFBbkIsaUJBT0M7UUFORyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyRCxFQUFFLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQzlDLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFD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U0FBUyxHQUFHLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzlFLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDNUQsTUFBTSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsZUFBZSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNoRyxNQUFNLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDL0UsQ0FBQyxDQUFDLENBQUM7U0FDTjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBdkkyQixVQUFVO2dEQUFHLE1BQU0sU0FBQyxxQkFBcUI7OztJQUg1RCxhQUFhO1FBRHpCLFVBQVUsQ0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMsQ0FBQztRQUlZLG1CQUFBLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO2lEQUExQyxVQUFVO09BSDdCLGFBQWEsQ0EySXpCO3dCQWxLRDtDQWtLQyxBQTNJRCxJQTJJQztTQTNJWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEQVRFX0ZPUk1BVCwgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWcgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgICBDbGluaWMsXG4gICAgQ2xpbmljQWRoZXJlLFxuICAgIENsaW5pY0FkdmVyc2VEcnVnUmVhY3Rpb24sXG4gICAgQ2xpbmljT3Bwb3J0dW5pc3RpY0luZmVjdGlvbixcbiAgICBDbGluaWNWbSxcbiAgICBQYXRpZW50XG59IGZyb20gJy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XG5cbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbnR5cGUgRW50aXR5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPENsaW5pYz47XG50eXBlIEVudGl0eUFycmF5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPENsaW5pY1tdPjtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQ2xpbmljU2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpL2NsaW5pY3MnO1xuICAgIH1cblxuICAgIGNyZWF0ZSh2bTogQ2xpbmljVm0pOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICB2bVsnY2xpbmljJ10gPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudCh2bS5jbGluaWMpO1xuICAgICAgICB2bVsnb2lTY3JlZW5lZCddID0gISF2bS5vaUxpc3QgPyAnWWVzJyA6ICdObyc7XG4gICAgICAgIHZtWydhZHJTY3JlZW5lZCddID0gISF2bS5hZHJMaXN0ID8gJ1llcycgOiAnTm8nO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAucG9zdDxDbGluaWM+KHRoaXMucmVzb3VyY2VVcmwsIHZtLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKSA9PiB0aGlzLmNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXMpKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKHZtOiBDbGluaWNWbSk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIHZtWydjbGluaWMnXSA9IHRoaXMuY29udmVydERhdGVGcm9tQ2xpZW50KHZtLmNsaW5pYyk7XG4gICAgICAgIHZtWydvaVNjcmVlbmVkJ10gPSAhIXZtLm9pTGlzdCA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgdm1bJ2FkclNjcmVlbmVkJ10gPSAhIXZtLmFkckxpc3QgPyAnWWVzJyA6ICdObyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wdXQ8Q2xpbmljPih0aGlzLnJlc291cmNlVXJsLCB2bSwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIGZpbmQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8Q2xpbmljPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBmaW5kQnlVdWlkKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PENsaW5pYz4oYCR7dGhpcy5yZXNvdXJjZVVybH0vYnktdXVpZC8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8YW55PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaXREYXRlc0J5UGF0aWVudChwYXRpZW50SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxNb21lbnRbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcGF0aWVudC8ke3BhdGllbnRJZH0vdmlzaXQtZGF0ZXNgKVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmZvckVhY2goZCA9PiBtb21lbnQoZCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgZ2V0UGF0aWVudChpZDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFBhdGllbnQ+KGAvYXBpL3BhdGllbnRzL2J5LXV1aWQvJHtpZH1gLCB7b2JzZXJ2ZTogJ2JvZHknfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0ZVJlZ2lzdHJhdGlvbiA9IHJlcy5kYXRlUmVnaXN0cmF0aW9uICE9IG51bGwgPyBtb21lbnQocmVzLmRhdGVSZWdpc3RyYXRpb24pIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGVCaXJ0aCA9IHJlcy5kYXRlQmlydGggIT0gbnVsbCA/IG1vbWVudChyZXMuZGF0ZUJpcnRoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KSlcbiAgICB9XG5cbiAgICBnZXRSZWdpbWVuTGluZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9yZWdpbWVuLXR5cGVzYClcbiAgICB9XG5cbiAgICBnZXRSZWdpbWVuQnlMaW5lKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9yZWdpbWVucy9yZWdpbWVuLXR5cGUvJHtpZH1gKVxuICAgIH1cblxuICAgIGFkdmVyc2VEcnVnUmVhY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vYWR2ZXJzZS1kcnVnLXJlYWN0aW9uc2ApXG4gICAgfVxuXG4gICAgb3Bwb3J0dW5pc3RpY0luZmVjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9vcHBvcnR1bmlzdGljLWluZmVjdGlvbnNgKVxuICAgIH1cblxuICAgIGFkaGVyZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9hZGhlcmVzYClcbiAgICB9XG5cbiAgICByZWdpbWVzKHJlZ2ltZW5UeXBlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vcmVnaW1lbnMvJHtyZWdpbWVuVHlwZX1gKVxuICAgIH1cblxuICAgIGxhdGVzdFZpc2l0KHBhdGllbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENsaW5pYz4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcGF0aWVudC8ke3BhdGllbnRJZH0vbGF0ZXN0YClcbiAgICB9XG5cbiAgICBnZXRPcHBvcnR1bmlzdGljSW5mZWN0aW9uc0J5Q2xpbmljKGNsaW5pY0lkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q2xpbmljT3Bwb3J0dW5pc3RpY0luZmVjdGlvbltdPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2NsaW5pY0lkfS9vcHBvcnR1bmlzdGljLWluZmVjdGlvbnNgKVxuICAgIH1cblxuICAgIGdldEFkdmVyc2VEcnVnUmVhY3Rpb25zQnlDbGluaWMoY2xpbmljSWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDbGluaWNBZHZlcnNlRHJ1Z1JlYWN0aW9uW10+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7Y2xpbmljSWR9L2FkdmVyc2UtZHJ1Zy1yZWFjdGlvbnNgLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxuXG4gICAgZ2V0QWRoZXJlQnlDbGluaWMoY2xpbmljSWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDbGluaWNBZGhlcmVbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtjbGluaWNJZH0vYWRoZXJlc2ApXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlRnJvbUNsaWVudChjbGluaWM6IENsaW5pYyk6IENsaW5pYyB7XG4gICAgICAgIGNvbnN0IGNvcHk6IENsaW5pYyA9IE9iamVjdC5hc3NpZ24oe30sIGNsaW5pYywge1xuICAgICAgICAgICAgZGF0ZVZpc2l0OiBjbGluaWMuZGF0ZVZpc2l0ICE9IG51bGwgJiYgY2xpbmljLmRhdGVWaXNpdC5pc1ZhbGlkKCkgPyBjbGluaWMuZGF0ZVZpc2l0LmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgbG1wOiBjbGluaWMubG1wICE9IG51bGwgJiYgY2xpbmljLmxtcC5pc1ZhbGlkKCkgPyBjbGluaWMubG1wLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgbmV4dEFwcG9pbnRtZW50OiBjbGluaWMubmV4dEFwcG9pbnRtZW50ICE9IG51bGwgJiYgY2xpbmljLm5leHRBcHBvaW50bWVudC5pc1ZhbGlkKCkgPyBjbGluaWMubmV4dEFwcG9pbnRtZW50LmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgcHJlZ25hbnQ6IGNsaW5pYy5wcmVnbmFuY3lTdGF0dXMgIT0gbnVsbCAmJiBjbGluaWMucHJlZ25hbmN5U3RhdHVzID09PSAyLFxuICAgICAgICAgICAgYnJlYXN0ZmVlZGluZzogY2xpbmljLnByZWduYW5jeVN0YXR1cyAhPSBudWxsICYmIGNsaW5pYy5wcmVnbmFuY3lTdGF0dXMgPT09IDMsXG4gICAgICAgICAgICBicDogY2xpbmljLmJwMSA+IDAgJiYgY2xpbmljLmJwMiA+IDAgPyBjbGluaWMuYnAxICsgJy8nICsgY2xpbmljLmJwMiA6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpOiBFbnRpdHlSZXNwb25zZVR5cGUge1xuICAgICAgICBpZiAocmVzLmJvZHkpIHtcbiAgICAgICAgICAgIHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCA9IHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCkgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZVZpc2l0ID0gcmVzLmJvZHkuZGF0ZVZpc2l0ICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZVZpc2l0KSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5sbXAgPSByZXMuYm9keS5sbXAgIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5sbXApIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LnByZWduYW5jeVN0YXR1cyA9IHJlcy5ib2R5LnByZWduYW50ID8gMiA6IHJlcy5ib2R5LmJyZWFzdGZlZWRpbmcgPyAzIDogMTtcbiAgICAgICAgICAgIGlmIChyZXMuYm9keS5icCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gcmVzLmJvZHkuYnAuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5icDEgPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICAgICAgcmVzLmJvZHkuYnAyID0gcGFydHMubGVuZ3RoID09PSAyID8gcGFyc2VJbnQocGFydHNbMV0pIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUFycmF5RnJvbVNlcnZlcihyZXM6IEVudGl0eUFycmF5UmVzcG9uc2VUeXBlKTogRW50aXR5QXJyYXlSZXNwb25zZVR5cGUge1xuICAgICAgICBpZiAocmVzLmJvZHkpIHtcbiAgICAgICAgICAgIHJlcy5ib2R5LmZvckVhY2goKGNsaW5pYzogQ2xpbmljKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xpbmljLmRhdGVWaXNpdCA9IGNsaW5pYy5kYXRlVmlzaXQgIT0gbnVsbCA/IG1vbWVudChjbGluaWMuZGF0ZVZpc2l0KSA6IG51bGw7XG4gICAgICAgICAgICAgICAgY2xpbmljLmxtcCA9IGNsaW5pYy5sbXAgIT0gbnVsbCA/IG1vbWVudChjbGluaWMubG1wKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgY2xpbmljLm5leHRBcHBvaW50bWVudCA9IGNsaW5pYy5uZXh0QXBwb2ludG1lbnQgIT0gbnVsbCA/IG1vbWVudChjbGluaWMubmV4dEFwcG9pbnRtZW50KSA6IG51bGw7XG4gICAgICAgICAgICAgICAgY2xpbmljLnByZWduYW5jeVN0YXR1cyA9IGNsaW5pYy5wcmVnbmFudCA/IDIgOiBjbGluaWMuYnJlYXN0ZmVlZGluZyA/IDMgOiAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cbiJdfQ==
