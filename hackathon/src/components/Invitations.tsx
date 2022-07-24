import { IonAvatar, IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonNote } from "@ionic/react";
import axios from "axios";
import { checkbox, trash } from "ionicons/icons";
import { createRef, useEffect, useState } from "react";
import { baseUrl } from "../services/http.service";
import { useServices } from "../services/providers";


interface ContainerProps {
  type: "ACCOUNT" | "FRIEND"
}

const Invitations: React.FC<ContainerProps> = ({ type }) => {
  const services = useServices();
  const [invitations, setInvitations] = useState({ loading: true } as { loading?: boolean, data: any[] })
  const isAccount = () => type === "ACCOUNT"

  const convertISOStringToMonthDay = (date: any) => {
    const tempDate = new Date(date).toString().split(' ');
    const formattedDate = `${tempDate[1]} ${+tempDate[2]}`;
    return formattedDate;
  };
  useEffect(() => {
    (async () => {
      const pocketInvitations = (await axios.get(`${baseUrl}/invitations/${services.authService.user?.id}`)).data
      const response = (await Promise.all(pocketInvitations.map(async (invite: any) => {
        try {
          let call = await axios.get(`${baseUrl}/${invite.type === "FRIEND" ? "customers" : "accounts/details"}/${invite.fromId}`)
          return { ...call.data, sentDate: invite.sentDateTime, inviteId: invite.id, type: invite.type }
        } catch (e) {
          return null
        }
      }))).filter(k => k)
      console.log("HERE", response)
      setInvitations({ data: response })
    })()
  }, [])
  return (invitations?.data ?
    <IonList>

      {invitations.data.filter(k => k.type === type).map((invite, index) => {
        const slidingItem = createRef<HTMLIonItemSlidingElement>()
        return (
          <IonItemSliding ref={slidingItem} key={index}>
            <IonItem onClick={() => slidingItem.current?.open("end")}>
              
                {!isAccount() &&
                <IonAvatar style={{marginRight: "5px"}}>
                  <img src={`${baseUrl}/profile-pic/${invite.profilePicture}`} />
                </IonAvatar>}
              <IonLabel>
                {isAccount() ? invite.title : `${invite.firstName} ${invite.lastName}`}
                {isAccount() && <p>{invite.description}</p>}
              </IonLabel>
              <IonNote slot="end">
                {convertISOStringToMonthDay(invite.sentDate)}
              </IonNote>
            </IonItem>
            <IonItemOptions side="end">
              <IonItemOption color="danger" onClick={async () => {
                await axios.delete(`${baseUrl}/invitations/${invite.inviteId}`)
                setInvitations((invitations) => ({ data: invitations.data.filter(i => i.inviteId != invite.inviteId) }))
              }}>
              <IonIcon slot="icon-only" icon={trash} />
              
              </IonItemOption>
              <IonItemOption onClick={async () => {
                await axios.post(`${baseUrl}/invitations/${invite.inviteId}`)
                setInvitations((invitations) => ({ data: invitations.data.filter(i => i.inviteId != invite.inviteId) }))
              }}>
                <IonIcon slot="icon-only" icon={checkbox} />
              </IonItemOption>
            </IonItemOptions>
          </IonItemSliding>
        )
      }
      )}

    </IonList>
  : <></>)
};

export default Invitations;
