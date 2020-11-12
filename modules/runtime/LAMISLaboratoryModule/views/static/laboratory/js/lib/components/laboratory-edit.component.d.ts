import {OnInit} from '@angular/core';
import {Laboratory, LaboratoryLine, LabTest, LabTestCategory, Patient} from '../model/laboratory.model';
import {LaboratoryService} from '../services/laboratory.service';
import {NotificationService} from '@alfresco/adf-core';
import {ActivatedRoute} from '@angular/router';
import {MatButton, MatProgressBar} from '@angular/material';
import {ColumnMode} from '@swimlane/ngx-datatable';
import * as moment_ from 'moment';
import {Moment} from 'moment';
import {AppLoaderService} from '@lamis/web-core';
import {TdDialogService} from '@covalent/core';

export declare class LaboratoryEditComponent implements OnInit {
    private laboratoryService;
    protected notification: NotificationService;
    private appLoaderService;
    private _dialogService;
    protected activatedRoute: ActivatedRoute;
    progressBar: MatProgressBar;
    submitButton: MatButton;
    entity: Laboratory;
    patient: Patient;
    dateRegistration: Moment;
    minAssayDate: Moment;
    minReportedDate: Moment;
    maxNextVisit: moment_.Moment;
    categories: LabTestCategory[];
    tests: LabTest[];
    selectedTests: LabTest[];
    isSaving: boolean;
    error: boolean;
    tomorrow: moment_.Moment;
    today: moment_.Moment;
    ColumnMode: typeof ColumnMode;
    editing: {};
    errors: {};
    rows: LaboratoryLine[];
    labTestIds: Set<any>;
    visitDates: Moment[];

    constructor(laboratoryService: LaboratoryService, notification: NotificationService, appLoaderService: AppLoaderService, _dialogService: TdDialogService, activatedRoute: ActivatedRoute);

    createEntity(): Laboratory;

    ngOnInit(): void;

    updateMinDates(): void;

    filterDates(date: Moment): boolean;

    previousState(): void;

    entityCompare(e1: any, e2: any): boolean;

    sampleDateChanged(date: Moment): void;

    assayDateChanged(date: Moment): void;

    edit(rowIndex: any): void;

    save(): void;

    categoryChanged(type: any): void;

    testChanged(event: any): void;

    updateValue(event: any, cell: any, rowIndex: any): void;

    private subscribeToSaveResponse;
    private onSaveSuccess;
    private onSaveError;

    protected onError(errorMessage: string): void;
}
