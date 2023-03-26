import {NavigationContainer} from '@react-navigation/native';

import {AppRoutes} from './app.routes';
import {State} from '../screens/State'
import {People} from '../screens/People'
import { Town } from '../screens/Town';
import { Coleta } from '../screens/Coleta';
import { Main } from '../screens/Main';
import React from 'react';

export function Routes(){


    return(
        <NavigationContainer>
           <Main/> 
        </NavigationContainer>
    )
};
//Em caso de erro, trocar Main por qualquer um dos itens abaixo
//<State/>
//<People/>
//<Town/>
//<Coleta/>
