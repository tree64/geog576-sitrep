<%@ page import="java.io.*"%>
<%@ page import="org.json.*"%>
<%@ page import="java.sql.SQLException"%>
<%@ page import="java.sql.ResultSet"%>
<%@ page import="org.webproject.servlet.lab_5.DBUtility"%>
 
<html>
<body>
 
<% 
 
PrintWriter output = response.getWriter();
response.setContentType("application/json");
response.setCharacterEncoding("UTF-8");
 
String tab_id = request.getParameter("tab_id");
 
// create a report
if (tab_id.equals("0")) {
    System.out.println("A report is submitted!");
    try {
        DBUtility dbutil = new DBUtility();     
        String sql;
        
        // 1. create emergency contact
        int contact_id = 0;
        String contact_fN = request.getParameter("contact_fN");
        String contact_lN = request.getParameter("contact_lN");
        String contact_tel = request.getParameter("contact_tel");
        String contact_email = request.getParameter("contact_email");
        if (contact_fN != null) {contact_fN = "'" + contact_fN + "'";}
        if (contact_lN != null) {contact_lN = "'" + contact_lN + "'";}
        if (contact_tel != null) {contact_tel = "'" + contact_tel + "'";}
        if (contact_email != null) {contact_email = "'" + contact_email + "'";}
        if (contact_fN != null && contact_lN != null) {
            // create the contact
            sql = "insert into person (first_name, last_name, telephone, email) " +
                    "values (" + contact_fN + "," + contact_lN + "," + contact_tel + "," 
                    + contact_email + ")";
            dbutil.modifyDB(sql);
            
            // record the contact id
            ResultSet res_1 = dbutil.queryDB("select last_value from person_id_seq");
            res_1.next();
            contact_id = res_1.getInt(1);
            
            System.out.println("Success! Contact created.");
        }
        
        // 2. create user
        int user_id = 0;
        String fN = request.getParameter("fN");
        String lN = request.getParameter("lN");
        String is_male = request.getParameter("is_male");
        String age = request.getParameter("age");
        String blood_type = request.getParameter("blood_type");
        String tel = request.getParameter("tel");
        String email = request.getParameter("email");
        if (fN != null) {fN = "'" + fN + "'";}
        if (lN != null) {lN = "'" + lN + "'";}
        if (is_male != null) {is_male = "'" + is_male + "'";}
        if (age != null) {age = "'" + age + "'";}
        if (blood_type != null) {blood_type = "'" + blood_type + "'";}
        if (tel != null) {tel = "'" + tel + "'";}
        if (email != null) {email = "'" + email + "'";}
        
        sql = "insert into person (first_name, last_name, is_male, age, " +
                "blood_type, telephone, email, emergency_contact_id) values (" + fN + 
                "," + lN + "," + is_male + "," + age + "," + blood_type + "," + tel +
                "," + email;
        if (contact_id > 0) { // check whether has a contact
            sql += "," + contact_id + ")";
        } else {
            sql += ",null)";
        }
        dbutil.modifyDB(sql);
        
        // record user_id
        ResultSet res_2 = dbutil.queryDB("select last_value from person_id_seq");
        res_2.next();
        user_id = res_2.getInt(1);
        
        System.out.println("Success! User created.");
        
        // 3. create report
        int report_id = 0;
        String report_type = request.getParameter("report_type");
        String disaster_type = request.getParameter("disaster_type");
        String lon = request.getParameter("longitude");
        String lat = request.getParameter("latitude");
        String message = request.getParameter("message");
        String add_msg = request.getParameter("additional_message");
        if (report_type != null) {report_type = "'" + report_type + "'";}
        if (disaster_type != null) {disaster_type = "'" + disaster_type + "'";}
        if (message != null) {message = "'" + message + "'";}
        if (add_msg != null) {add_msg = "'" + add_msg + "'";}
        
        sql = "insert into report (reporter_id, report_type, disaster_type, geom," +
                " message) values (" + user_id + "," + report_type + "," + disaster_type
                + ", ST_GeomFromText('POINT(" + lon + " " + lat + ")', 4326)" + "," + 
                message + ")";
        dbutil.modifyDB(sql);
        
        // record report_id
        ResultSet res_3 = dbutil.queryDB("select last_value from report_id_seq");
        res_3.next();
        report_id = res_3.getInt(1);
        
        System.out.println("Success! Report created.");
        
        // 4. create specific report
        if (report_type.equals("'donation'")) {
            sql = "insert into donation_report (report_id, resource_type) values ('"
                    + report_id + "'," + add_msg + ")";
            System.out.println("Success! Donation report created.");
        } else if (report_type.equals("'request'")) {
            sql = "insert into request_report (report_id, resource_type) values ('"
                    + report_id + "'," + add_msg + ")";
            System.out.println("Success! Request report created.");
        } else if (report_type.equals("'damage'")) {
            sql = "insert into damage_report (report_id, damage_type) values ('"
                    + report_id + "'," + add_msg + ")";
            System.out.println("Success! Damage report created.");
        } else {
            return;
        }
        dbutil.modifyDB(sql);
        
        // response that the report submission is successful
        JSONObject data = new JSONObject();
        data.put("status", "success");
        response.getWriter().write(data.toString());        
        
    } catch (SQLException e) {
        e.printStackTrace();
    }
} 
    
output.close();
 
%>
</body>
</html>
