import {
    IDropdownOption,
    Dropdown,
} from 'office-ui-fabric-react';
import { useContext, useEffect, useState } from 'react';
import { COLOR2 } from '../../../Library/constants';
import {
    contentClassName,
    dialogStyles,
    dropdownStyles,
    editButtonStyles,
    progressIndicatorStyles,
    saveButtonStyles
} from './setAlgorithmView.styles';
import { DefaultButton, ProgressIndicator } from '@fluentui/react';
import { CustomDialog } from '../../CustomDialog/customDialog';
import { ServiceContext, ServiceContextInstance } from '../../../Core/serviceContext';
import { IAlgorithmChangeCreate } from '../../../Models/AlgorithmChange/IAlgorithmChangeCreate';
import { IFetchResult } from '../../../Hooks/useFetch.types';
import { IAlgorithmChangeRead } from '../../../Models/AlgorithmChange/IAlgorithmChangeRead';
import { useFetch } from '../../../Hooks/useFetch';
import { AlgorithmChangeStatisticInfoCard } from '../../AlgorithmChangeStatisticInfoCard/algorithmChangeStatisticInfoCard';

export const SetAlgorithmView = (): JSX.Element => {
    const algorithmDropdownOptions: IDropdownOption[] = [
        { key: 'algorithm1', text: 'Algorithm 1' },
        { key: 'algorithm2', text: 'Algorithm 2' },
    ];
    const [selectedAlgorithmDropdownOption, setSelectedAlgorithmDropdownOption] = useState<IDropdownOption>();
    const [isEditButtonClicked, setIsEditButtonClicked] = useState<boolean>(false);
    const [isSaveClicked, setIsSaveClicked] = useState<boolean>(false);
    const [displayProgessIndicator, setDisplayProgessIndicator] = useState<boolean>(false);
    const [percentComplete, setPercentComplete] = useState(0);
    const services = useContext<ServiceContext>(ServiceContextInstance);
    const [algorithmChanges, setAlgorithmChanges] = useState<IAlgorithmChangeRead[] | IAlgorithmChangeCreate[]>([]);
    const [areAlgorithmChangesLoaded, setAreAlgorithmChangesLoaded] = useState<boolean>(false);
    const algorithmChangesData: IFetchResult<IAlgorithmChangeCreate[] | IAlgorithmChangeRead[]> =
        useFetch<IAlgorithmChangeCreate[] | IAlgorithmChangeRead[]>(() => services.AlgorithmChangesService.GetAll(), [displayProgessIndicator.toString()]);

    useEffect(() => {
        if (algorithmChangesData.isLoading) {
            return;
        }
        if (algorithmChangesData.errors !== "" ||
            algorithmChangesData.data?.Error !== undefined ||
            algorithmChangesData.data == null ||
            algorithmChangesData.data.Data === undefined) {
            return;
        }
        setAlgorithmChanges(algorithmChangesData.data.Data);
        setAreAlgorithmChangesLoaded(true);
    }, [algorithmChangesData]);

    useEffect(() => {
        if (displayProgessIndicator === true) {
            const intervalDelay = 50;
            const intervalIncrement = 0.01;
            setTimeout(() => {
                setPercentComplete((intervalIncrement + percentComplete) % 1);
                if ((intervalIncrement + percentComplete) > 1) {
                    setDisplayProgessIndicator(false);
                    return;
                }
            }, intervalDelay);
        }
    });

    const handleAlgorithmSelection = (event: React.FormEvent<HTMLDivElement>, newAlgorithm?: IDropdownOption): void => {
        setSelectedAlgorithmDropdownOption(newAlgorithm!);
    };

    const handleDropDownMouseEnter = (event: any): void => {
        $(event.target).css('color', 'white');
        $(event.target).css('border-color', COLOR2);
        $(event.target).css('border', `2px solid ${COLOR2}`);
        $(event.currentTarget)
            .find('i[data-icon-name="ChevronDown"]')
            .css('color', COLOR2);
    };

    const handleEditButtonClick = (): void => {
        setIsEditButtonClicked(true);
    };

    const handleSaveButtonClick = (): void => {
        setTimeout(() => {
            setIsEditButtonClicked(false);
            setIsSaveClicked(true);
        }, 500);
    };

    const handleCloseDialog = (accepted?: boolean): void => {
        if (!accepted) {
            setIsSaveClicked(false);
            return;
        }
        setIsSaveClicked(false);
        const algorithmChange: IAlgorithmChangeCreate = {
            algorithmName: selectedAlgorithmDropdownOption!.text,
            startDate: new Date(),
            endDate: new Date()
        };
        services.AlgorithmChangesService.Add(algorithmChange);
        setDisplayProgessIndicator(true);
    };

    return <div>
        <div style={displayProgessIndicator === false ? { display: 'none' } : {}}>
            <ProgressIndicator styles={progressIndicatorStyles}
                label={'Changing Algorithm...'}
                percentComplete={percentComplete} />
        </div>
        <div className={contentClassName}>
            <div>
                <Dropdown selectedKey={selectedAlgorithmDropdownOption ? selectedAlgorithmDropdownOption.key : undefined}
                    onMouseEnter={handleDropDownMouseEnter}
                    disabled={isEditButtonClicked === false}
                    label={'Please choose algorithm'}
                    onChange={handleAlgorithmSelection}
                    options={algorithmDropdownOptions}
                    styles={dropdownStyles} />
                <DefaultButton onClick={handleEditButtonClick}
                    styles={editButtonStyles}
                    text='Edit' />
                <DefaultButton disabled={selectedAlgorithmDropdownOption === undefined}
                    styles={saveButtonStyles}
                    onClick={handleSaveButtonClick}
                    text='Save' />
            </div>
            <div>
                {
                    areAlgorithmChangesLoaded &&
                    <AlgorithmChangeStatisticInfoCard algorithmChanges={algorithmChanges} />
                }
            </div>
        </div>
        <div style={{ position: 'absolute' }}>
            <CustomDialog mainText={"Are you sure of updates?"}
                isHidden={!isSaveClicked}
                dialogStyles={dialogStyles}
                handleCloseDialog={handleCloseDialog}
                acceptedText="Yes"
                cancelText='No' />
        </div>
    </div>
};