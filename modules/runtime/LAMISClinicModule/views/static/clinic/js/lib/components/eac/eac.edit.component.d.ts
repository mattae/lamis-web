import {OnInit} from '@angular/core';
import * as moment_ from 'moment';
import {ClinicService} from '../../services/clinic.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {AppLoaderService} from '@lamis/web-core';
import {EAC, Patient} from '../../model/clinic.model';
import {EacService} from '../../services/eac.service';
import {Moment} from 'moment';

export declare class EacEditComponent implements OnInit {
    private clinicService;
    private eacService;
    protected notification: NotificationService;
    protected activatedRoute: ActivatedRoute;
    private appLoaderService;
    entity: EAC;
    patient: Patient;
    today: moment_.Moment;
    dateRegistration: Moment;
    eac1Min: Moment;
    eac2Min: Moment;
    eac3Min: Moment;
    repeatVLMin: Moment;
    repeatVLMax: Moment;
    isSaving: boolean;

    constructor(clinicService: ClinicService, eacService: EacService, notification: NotificationService, activatedRoute: ActivatedRoute, appLoaderService: AppLoaderService);

    createEntity(): EAC;

    ngOnInit(): void;

    dateEac1Changed(date: Moment): void;

    dateEac2Changed(date: Moment): void;

    dateEac3Changed(date: Moment): void;

    save(): void;

    previousState(): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
