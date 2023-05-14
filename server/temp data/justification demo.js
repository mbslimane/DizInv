let sql = `select justification.id_absence, absence.id_session, user.firstName,   user.lastName, absence.isJustified, sessions.level,
 sessions.moduleName, sessions.sceance, justification.justification_date, justification.justification_timeStamp, justification.student_comment
from dizinv.justification, dizinv.absence, dizinv.sessions, dizinv.user
where justification.id_absence = absence.id_absence
and absence.id_session = sessions.id_session
and absence.inscription_no = user.id_user; `;
