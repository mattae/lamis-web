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
let ClinicService = class ClinicService {
    constructor(http, serverUrl) {
        this.http = http;
        this.serverUrl = serverUrl;
        this.resourceUrl = '';
        this.resourceUrl = serverUrl.SERVER_API_URL + '/api/clinics';
    }

    create(vm) {
        vm['clinic'] = this.convertDateFromClient(vm.clinic);
        vm['oiScreened'] = !!vm.oiList ? 'Yes' : 'No';
        vm['adrScreened'] = !!vm.adrList ? 'Yes' : 'No';
        return this.http
            .post(this.resourceUrl, vm, {observe: 'response'})
            .pipe(map((res) => this.convertDateFromServer(res)));
    }

    update(vm) {
        vm['clinic'] = this.convertDateFromClient(vm.clinic);
        vm['oiScreened'] = !!vm.oiList ? 'Yes' : 'No';
        vm['adrScreened'] = !!vm.adrList ? 'Yes' : 'No';
        return this.http
            .put(this.resourceUrl, vm, {observe: 'response'})
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

    getVisitDatesByPatient(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/visit-dates`)
            .pipe(map((res) => {
                res.forEach(d => moment(d));
                return res;
            }));
    }

    getPatient(id) {
        return this.http.get(`/api/patients/by-uuid/${id}`, {observe: 'body'})
            .pipe(map((res) => {
                if (res) {
                    res.dateRegistration = res.dateRegistration != null ? moment(res.dateRegistration) : null;
                    res.dateBirth = res.dateBirth != null ? moment(res.dateBirth) : null;
                }
                return res;
            }));
    }

    getRegimenLines() {
        return this.http.get(`${this.resourceUrl}/regimen-types`);
    }

    getRegimenByLine(id) {
        return this.http.get(`${this.resourceUrl}/regimens/regimen-type/${id}`);
    }

    adverseDrugReactions() {
        return this.http.get(`${this.resourceUrl}/adverse-drug-reactions`);
    }

    opportunisticInfections() {
        return this.http.get(`${this.resourceUrl}/opportunistic-infections`);
    }

    adheres() {
        return this.http.get(`${this.resourceUrl}/adheres`);
    }

    regimes(regimenType) {
        return this.http.get(`${this.resourceUrl}/regimens/${regimenType}`);
    }

    latestVisit(patientId) {
        return this.http.get(`${this.resourceUrl}/patient/${patientId}/latest`);
    }

    getOpportunisticInfectionsByClinic(clinicId) {
        return this.http.get(`${this.resourceUrl}/${clinicId}/opportunistic-infections`);
    }

    getAdverseDrugReactionsByClinic(clinicId) {
        return this.http.get(`${this.resourceUrl}/${clinicId}/adverse-drug-reactions`, {observe: 'response'});
    }

    getAdhereByClinic(clinicId) {
        return this.http.get(`${this.resourceUrl}/${clinicId}/adheres`);
    }

    convertDateFromClient(clinic) {
        const copy = Object.assign({}, clinic, {
            dateVisit: clinic.dateVisit != null && clinic.dateVisit.isValid() ? clinic.dateVisit.format(DATE_FORMAT) : null,
            lmp: clinic.lmp != null && clinic.lmp.isValid() ? clinic.lmp.format(DATE_FORMAT) : null,
            nextAppointment: clinic.nextAppointment != null && clinic.nextAppointment.isValid() ? clinic.nextAppointment.format(DATE_FORMAT) : null,
            pregnant: clinic.pregnancyStatus != null && clinic.pregnancyStatus === 2,
            breastfeeding: clinic.pregnancyStatus != null && clinic.pregnancyStatus === 3,
            bp: clinic.bp1 > 0 && clinic.bp2 > 0 ? clinic.bp1 + '/' + clinic.bp2 : null
        });
        return copy;
    }

    convertDateFromServer(res) {
        if (res.body) {
            res.body.nextAppointment = res.body.nextAppointment != null ? moment(res.body.nextAppointment) : null;
            res.body.dateVisit = res.body.dateVisit != null ? moment(res.body.dateVisit) : null;
            res.body.lmp = res.body.lmp != null ? moment(res.body.lmp) : null;
            res.body.pregnancyStatus = res.body.pregnant ? 2 : res.body.breastfeeding ? 3 : 1;
            if (res.body.bp) {
                const parts = res.body.bp.split('/');
                res.body.bp1 = parseInt(parts[0]);
                res.body.bp2 = parts.length === 2 ? parseInt(parts[1]) : null;
            }
        }
        return res;
    }

    convertDateArrayFromServer(res) {
        if (res.body) {
            res.body.forEach((clinic) => {
                clinic.dateVisit = clinic.dateVisit != null ? moment(clinic.dateVisit) : null;
                clinic.lmp = clinic.lmp != null ? moment(clinic.lmp) : null;
                clinic.nextAppointment = clinic.nextAppointment != null ? moment(clinic.nextAppointment) : null;
                clinic.pregnancyStatus = clinic.pregnant ? 2 : clinic.breastfeeding ? 3 : 1;
            });
        }
        return res;
    }
};
ClinicService.ctorParameters = () => [
    {type: HttpClient},
    {type: undefined, decorators: [{type: Inject, args: [SERVER_API_URL_CONFIG,]}]}
];
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
export {ClinicService};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpbmljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9sYW1pcy1jbGluaWMtMS4xLjMvIiwic291cmNlcyI6WyJsaWIvc2VydmljZXMvY2xpbmljLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFaEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxxQkFBcUIsRUFBc0IsTUFBTSxpQkFBaUIsQ0FBQztBQUN6RixPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFVckMsT0FBTyxLQUFLLE9BQU8sTUFBTSxRQUFRLENBQUM7Ozs7QUFHbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDO0FBTXZCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7SUFHdEIsWUFBc0IsSUFBZ0IsRUFBeUMsU0FBNkI7UUFBdEYsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUF5QyxjQUFTLEdBQVQsU0FBUyxDQUFvQjtRQUZyRyxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUdwQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0lBQ2pFLENBQUM7SUFFRCxNQUFNLENBQUMsRUFBWTtRQUNmLEVBQUUsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JELEVBQUUsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDOUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxL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LE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUM5RSxNQUFNLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzVELE1BQU0sQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDaEcsTUFBTSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQy9FLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNmLENBQUM7Q0FDSixDQUFBOztZQXhJK0IsVUFBVTs0Q0FBRyxNQUFNLFNBQUMscUJBQXFCOzs7QUFINUQsYUFBYTtJQUR6QixVQUFVLENBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDLENBQUM7SUFJWSxtQkFBQSxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQTs2Q0FBMUMsVUFBVTtHQUg3QixhQUFhLENBMkl6QjtTQTNJWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwUmVzcG9uc2UgfSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBEQVRFX0ZPUk1BVCwgU0VSVkVSX0FQSV9VUkxfQ09ORklHLCBTZXJ2ZXJBcGlVcmxDb25maWcgfSBmcm9tICdAbGFtaXMvd2ViLWNvcmUnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHtcbiAgICBDbGluaWMsXG4gICAgQ2xpbmljQWRoZXJlLFxuICAgIENsaW5pY0FkdmVyc2VEcnVnUmVhY3Rpb24sXG4gICAgQ2xpbmljT3Bwb3J0dW5pc3RpY0luZmVjdGlvbixcbiAgICBDbGluaWNWbSxcbiAgICBQYXRpZW50XG59IGZyb20gJy4uL21vZGVsL2NsaW5pYy5tb2RlbCc7XG5cbmltcG9ydCAqIGFzIG1vbWVudF8gZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IE1vbWVudCB9IGZyb20gJ21vbWVudCc7XG5cbmNvbnN0IG1vbWVudCA9IG1vbWVudF87XG5cbnR5cGUgRW50aXR5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPENsaW5pYz47XG50eXBlIEVudGl0eUFycmF5UmVzcG9uc2VUeXBlID0gSHR0cFJlc3BvbnNlPENsaW5pY1tdPjtcblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQ2xpbmljU2VydmljZSB7XG4gICAgcHVibGljIHJlc291cmNlVXJsID0gJyc7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChTRVJWRVJfQVBJX1VSTF9DT05GSUcpIHByaXZhdGUgc2VydmVyVXJsOiBTZXJ2ZXJBcGlVcmxDb25maWcpIHtcbiAgICAgICAgdGhpcy5yZXNvdXJjZVVybCA9IHNlcnZlclVybC5TRVJWRVJfQVBJX1VSTCArICcvYXBpL2NsaW5pY3MnO1xuICAgIH1cblxuICAgIGNyZWF0ZSh2bTogQ2xpbmljVm0pOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICB2bVsnY2xpbmljJ10gPSB0aGlzLmNvbnZlcnREYXRlRnJvbUNsaWVudCh2bS5jbGluaWMpO1xuICAgICAgICB2bVsnb2lTY3JlZW5lZCddID0gISF2bS5vaUxpc3QgPyAnWWVzJyA6ICdObyc7XG4gICAgICAgIHZtWydhZHJTY3JlZW5lZCddID0gISF2bS5hZHJMaXN0ID8gJ1llcycgOiAnTm8nO1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAucG9zdDxDbGluaWM+KHRoaXMucmVzb3VyY2VVcmwsIHZtLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgICAgICAgICAucGlwZShtYXAoKHJlczogRW50aXR5UmVzcG9uc2VUeXBlKSA9PiB0aGlzLmNvbnZlcnREYXRlRnJvbVNlcnZlcihyZXMpKSk7XG4gICAgfVxuXG4gICAgdXBkYXRlKHZtOiBDbGluaWNWbSk6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIHZtWydjbGluaWMnXSA9IHRoaXMuY29udmVydERhdGVGcm9tQ2xpZW50KHZtLmNsaW5pYyk7XG4gICAgICAgIHZtWydvaVNjcmVlbmVkJ10gPSAhIXZtLm9pTGlzdCA/ICdZZXMnIDogJ05vJztcbiAgICAgICAgdm1bJ2FkclNjcmVlbmVkJ10gPSAhIXZtLmFkckxpc3QgPyAnWWVzJyA6ICdObyc7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5wdXQ8Q2xpbmljPih0aGlzLnJlc291cmNlVXJsLCB2bSwge29ic2VydmU6ICdyZXNwb25zZSd9KVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXM6IEVudGl0eVJlc3BvbnNlVHlwZSkgPT4gdGhpcy5jb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzKSkpO1xuICAgIH1cblxuICAgIGZpbmQoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8RW50aXR5UmVzcG9uc2VUeXBlPiB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHBcbiAgICAgICAgICAgIC5nZXQ8Q2xpbmljPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBmaW5kQnlVdWlkKGlkOiBzdHJpbmcpOiBPYnNlcnZhYmxlPEVudGl0eVJlc3BvbnNlVHlwZT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwXG4gICAgICAgICAgICAuZ2V0PENsaW5pYz4oYCR7dGhpcy5yZXNvdXJjZVVybH0vYnktdXVpZC8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpID0+IHRoaXMuY29udmVydERhdGVGcm9tU2VydmVyKHJlcykpKTtcbiAgICB9XG5cbiAgICBkZWxldGUoaWQ6IG51bWJlcik6IE9ic2VydmFibGU8SHR0cFJlc3BvbnNlPGFueT4+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5kZWxldGU8YW55PihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2lkfWAsIHtvYnNlcnZlOiAncmVzcG9uc2UnfSk7XG4gICAgfVxuXG4gICAgZ2V0VmlzaXREYXRlc0J5UGF0aWVudChwYXRpZW50SWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxNb21lbnRbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcGF0aWVudC8ke3BhdGllbnRJZH0vdmlzaXQtZGF0ZXNgKVxuICAgICAgICAgICAgLnBpcGUobWFwKChyZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmZvckVhY2goZCA9PiBtb21lbnQoZCkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgfVxuXG4gICAgZ2V0UGF0aWVudChpZDogYW55KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PFBhdGllbnQ+KGAvYXBpL3BhdGllbnRzL2J5LXV1aWQvJHtpZH1gLCB7b2JzZXJ2ZTogJ2JvZHknfSlcbiAgICAgICAgICAgIC5waXBlKG1hcCgocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgICAgICAgICAgICByZXMuZGF0ZVJlZ2lzdHJhdGlvbiA9IHJlcy5kYXRlUmVnaXN0cmF0aW9uICE9IG51bGwgPyBtb21lbnQocmVzLmRhdGVSZWdpc3RyYXRpb24pIDogbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzLmRhdGVCaXJ0aCA9IHJlcy5kYXRlQmlydGggIT0gbnVsbCA/IG1vbWVudChyZXMuZGF0ZUJpcnRoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgICAgICB9KSlcbiAgICB9XG5cbiAgICBnZXRSZWdpbWVuTGluZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9yZWdpbWVuLXR5cGVzYClcbiAgICB9XG5cbiAgICBnZXRSZWdpbWVuQnlMaW5lKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9yZWdpbWVucy9yZWdpbWVuLXR5cGUvJHtpZH1gKVxuICAgIH1cblxuICAgIGFkdmVyc2VEcnVnUmVhY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxhbnlbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vYWR2ZXJzZS1kcnVnLXJlYWN0aW9uc2ApXG4gICAgfVxuXG4gICAgb3Bwb3J0dW5pc3RpY0luZmVjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9vcHBvcnR1bmlzdGljLWluZmVjdGlvbnNgKVxuICAgIH1cblxuICAgIGFkaGVyZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PGFueVtdPihgJHt0aGlzLnJlc291cmNlVXJsfS9hZGhlcmVzYClcbiAgICB9XG5cbiAgICByZWdpbWVzKHJlZ2ltZW5UeXBlOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5yZXNvdXJjZVVybH0vcmVnaW1lbnMvJHtyZWdpbWVuVHlwZX1gKVxuICAgIH1cblxuICAgIGxhdGVzdFZpc2l0KHBhdGllbnRJZDogbnVtYmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmh0dHAuZ2V0PENsaW5pYz4oYCR7dGhpcy5yZXNvdXJjZVVybH0vcGF0aWVudC8ke3BhdGllbnRJZH0vbGF0ZXN0YClcbiAgICB9XG5cbiAgICBnZXRPcHBvcnR1bmlzdGljSW5mZWN0aW9uc0J5Q2xpbmljKGNsaW5pY0lkOiBudW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQ8Q2xpbmljT3Bwb3J0dW5pc3RpY0luZmVjdGlvbltdPihgJHt0aGlzLnJlc291cmNlVXJsfS8ke2NsaW5pY0lkfS9vcHBvcnR1bmlzdGljLWluZmVjdGlvbnNgKVxuICAgIH1cblxuICAgIGdldEFkdmVyc2VEcnVnUmVhY3Rpb25zQnlDbGluaWMoY2xpbmljSWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDbGluaWNBZHZlcnNlRHJ1Z1JlYWN0aW9uW10+KGAke3RoaXMucmVzb3VyY2VVcmx9LyR7Y2xpbmljSWR9L2FkdmVyc2UtZHJ1Zy1yZWFjdGlvbnNgLCB7b2JzZXJ2ZTogJ3Jlc3BvbnNlJ30pXG4gICAgfVxuXG4gICAgZ2V0QWRoZXJlQnlDbGluaWMoY2xpbmljSWQ6IG51bWJlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5odHRwLmdldDxDbGluaWNBZGhlcmVbXT4oYCR7dGhpcy5yZXNvdXJjZVVybH0vJHtjbGluaWNJZH0vYWRoZXJlc2ApXG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGNvbnZlcnREYXRlRnJvbUNsaWVudChjbGluaWM6IENsaW5pYyk6IENsaW5pYyB7XG4gICAgICAgIGNvbnN0IGNvcHk6IENsaW5pYyA9IE9iamVjdC5hc3NpZ24oe30sIGNsaW5pYywge1xuICAgICAgICAgICAgZGF0ZVZpc2l0OiBjbGluaWMuZGF0ZVZpc2l0ICE9IG51bGwgJiYgY2xpbmljLmRhdGVWaXNpdC5pc1ZhbGlkKCkgPyBjbGluaWMuZGF0ZVZpc2l0LmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgbG1wOiBjbGluaWMubG1wICE9IG51bGwgJiYgY2xpbmljLmxtcC5pc1ZhbGlkKCkgPyBjbGluaWMubG1wLmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgbmV4dEFwcG9pbnRtZW50OiBjbGluaWMubmV4dEFwcG9pbnRtZW50ICE9IG51bGwgJiYgY2xpbmljLm5leHRBcHBvaW50bWVudC5pc1ZhbGlkKCkgPyBjbGluaWMubmV4dEFwcG9pbnRtZW50LmZvcm1hdChEQVRFX0ZPUk1BVCkgOiBudWxsLFxuICAgICAgICAgICAgcHJlZ25hbnQ6IGNsaW5pYy5wcmVnbmFuY3lTdGF0dXMgIT0gbnVsbCAmJiBjbGluaWMucHJlZ25hbmN5U3RhdHVzID09PSAyLFxuICAgICAgICAgICAgYnJlYXN0ZmVlZGluZzogY2xpbmljLnByZWduYW5jeVN0YXR1cyAhPSBudWxsICYmIGNsaW5pYy5wcmVnbmFuY3lTdGF0dXMgPT09IDMsXG4gICAgICAgICAgICBicDogY2xpbmljLmJwMSA+IDAgJiYgY2xpbmljLmJwMiA+IDAgPyBjbGluaWMuYnAxICsgJy8nICsgY2xpbmljLmJwMiA6IG51bGxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb3B5O1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUZyb21TZXJ2ZXIocmVzOiBFbnRpdHlSZXNwb25zZVR5cGUpOiBFbnRpdHlSZXNwb25zZVR5cGUge1xuICAgICAgICBpZiAocmVzLmJvZHkpIHtcbiAgICAgICAgICAgIHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCA9IHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCAhPSBudWxsID8gbW9tZW50KHJlcy5ib2R5Lm5leHRBcHBvaW50bWVudCkgOiBudWxsO1xuICAgICAgICAgICAgcmVzLmJvZHkuZGF0ZVZpc2l0ID0gcmVzLmJvZHkuZGF0ZVZpc2l0ICE9IG51bGwgPyBtb21lbnQocmVzLmJvZHkuZGF0ZVZpc2l0KSA6IG51bGw7XG4gICAgICAgICAgICByZXMuYm9keS5sbXAgPSByZXMuYm9keS5sbXAgIT0gbnVsbCA/IG1vbWVudChyZXMuYm9keS5sbXApIDogbnVsbDtcbiAgICAgICAgICAgIHJlcy5ib2R5LnByZWduYW5jeVN0YXR1cyA9IHJlcy5ib2R5LnByZWduYW50ID8gMiA6IHJlcy5ib2R5LmJyZWFzdGZlZWRpbmcgPyAzIDogMTtcbiAgICAgICAgICAgIGlmIChyZXMuYm9keS5icCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRzID0gcmVzLmJvZHkuYnAuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICByZXMuYm9keS5icDEgPSBwYXJzZUludChwYXJ0c1swXSk7XG4gICAgICAgICAgICAgICAgcmVzLmJvZHkuYnAyID0gcGFydHMubGVuZ3RoID09PSAyID8gcGFyc2VJbnQocGFydHNbMV0pIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBjb252ZXJ0RGF0ZUFycmF5RnJvbVNlcnZlcihyZXM6IEVudGl0eUFycmF5UmVzcG9uc2VUeXBlKTogRW50aXR5QXJyYXlSZXNwb25zZVR5cGUge1xuICAgICAgICBpZiAocmVzLmJvZHkpIHtcbiAgICAgICAgICAgIHJlcy5ib2R5LmZvckVhY2goKGNsaW5pYzogQ2xpbmljKSA9PiB7XG4gICAgICAgICAgICAgICAgY2xpbmljLmRhdGVWaXNpdCA9IGNsaW5pYy5kYXRlVmlzaXQgIT0gbnVsbCA/IG1vbWVudChjbGluaWMuZGF0ZVZpc2l0KSA6IG51bGw7XG4gICAgICAgICAgICAgICAgY2xpbmljLmxtcCA9IGNsaW5pYy5sbXAgIT0gbnVsbCA/IG1vbWVudChjbGluaWMubG1wKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgY2xpbmljLm5leHRBcHBvaW50bWVudCA9IGNsaW5pYy5uZXh0QXBwb2ludG1lbnQgIT0gbnVsbCA/IG1vbWVudChjbGluaWMubmV4dEFwcG9pbnRtZW50KSA6IG51bGw7XG4gICAgICAgICAgICAgICAgY2xpbmljLnByZWduYW5jeVN0YXR1cyA9IGNsaW5pYy5wcmVnbmFudCA/IDIgOiBjbGluaWMuYnJlYXN0ZmVlZGluZyA/IDMgOiAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbn1cbiJdfQ==
