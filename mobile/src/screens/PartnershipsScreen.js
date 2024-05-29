import { useEffect, useState } from 'react';
import { listPartnerships } from '../cruds/partnership';

const PartnershipsScreen = ({ navigation }) => {
    const [partnerships, setPartnerships] = useState([]);
    useEffect(()=>{
        async function fetchPartnerships(){
            let result = await listPartnerships();
            let segregatedByRoute = {};
            console.log(result);
            
            result.forEach((partnership) => {
                if(!segregatedByRoute[partnership.route_id]){
                    segregatedByRoute[partnership.route_id] = [];
                }
                segregatedByRoute[partnership.route_id].push(partnership);
            });
        }

        fetchPartnerships();
    });

    return(
        <ScrollView>
            <Screen title="Cadastrar Rota">
            {}


            {users.length > 0 && 
              <View>
                <IntentionSection 
                  intention="Caronas recebidas"
                  navigation={navigation}
                  users={users.filter((user) => user.intentions.includes("offer_ride"))}
                />
                <IntentionSection
                  intention="Caronas oferecidas"
                  navigation={navigation}
                  users={users.filter((user) => user.intentions.includes("receive_ride"))}
                />
                <IntentionSection
                  intention="Racham aplicativo"
                  navigation={navigation}
                  users={users.filter((user) => user.intentions.includes("split_app"))}
                />
                <IntentionSection
                  intention="Companhias de busão"
                  navigation={navigation}
                  users={users.filter((user) => user.intentions.includes("bus_pal"))}
                />
              </View>
            }
            </Screen>
        </ScrollView>
    );
}

export default PartnershipsScreen;