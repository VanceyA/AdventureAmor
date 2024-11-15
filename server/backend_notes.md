# Requirements for backend

## Models

### User
    * DisplayName (string)
    * Email (string)
    * isAdmin (bool)
    * Partner (UserId of Partner)
    * CompletedChallenges (array of completed challenge ids)

### Challenge
    * Title
    * Description 
    * Length (projected time the challenge will take)
    * Price (projected dollar amount)
    * isHome (bool)
    * ChallengeDate (Signify a daily mini-date challenge, allows to pull all objects)



### Completed Challenge
    * ChallengeId (id of challenge)
    * Picture (text of url)
    * Note (feedback from user )
    * Rating (number from 1-5)
    * ActualPrice (actual dollar amount spent)


