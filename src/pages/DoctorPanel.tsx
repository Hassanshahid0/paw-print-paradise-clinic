
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  MessageSquare, 
  Check, 
  X
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHeader, 
  TableHead, 
  TableRow 
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for appointments
const appointments = [
  {
    id: 1,
    petName: "Max",
    petType: "Dog",
    ownerName: "John Smith",
    date: "Apr 28, 2025",
    time: "10:00 AM",
    reason: "Annual check-up",
    status: "Upcoming"
  },
  {
    id: 2,
    petName: "Bella",
    petType: "Cat",
    ownerName: "Sarah Johnson",
    date: "Apr 28, 2025",
    time: "11:30 AM",
    reason: "Vaccination",
    status: "Upcoming"
  },
  {
    id: 3,
    petName: "Rocky",
    petType: "Dog",
    ownerName: "Mike Peterson",
    date: "Apr 28, 2025",
    time: "2:00 PM",
    reason: "Skin issue",
    status: "Upcoming"
  },
  {
    id: 4,
    petName: "Luna",
    petType: "Cat",
    ownerName: "Emily Davis",
    date: "Apr 29, 2025",
    time: "9:15 AM",
    reason: "Dental check",
    status: "Upcoming"
  }
];

// Mock data for patient records
const patientRecords = [
  {
    id: 101,
    petName: "Max",
    petType: "Dog",
    breed: "Golden Retriever",
    age: "5 years",
    ownerName: "John Smith",
    lastVisit: "Jan 15, 2025"
  },
  {
    id: 102,
    petName: "Bella",
    petType: "Cat",
    breed: "Siamese",
    age: "3 years",
    ownerName: "Sarah Johnson",
    lastVisit: "Feb 22, 2025"
  },
  {
    id: 103,
    petName: "Luna",
    petType: "Cat",
    breed: "Persian",
    age: "2 years",
    ownerName: "Emily Davis",
    lastVisit: "Mar 10, 2025"
  }
];

// Mock data for messages
const messages = [
  {
    id: 201,
    from: "John Smith",
    subject: "Max's medication question",
    message: "Hi Dr., is it okay to give Max his medication with food?",
    received: "Apr 26, 2025, 3:45 PM",
    read: true
  },
  {
    id: 202,
    from: "Sarah Johnson",
    subject: "Bella's post-vaccination care",
    message: "Dr., Bella seems lethargic after today's vaccination. Is this normal?",
    received: "Apr 27, 2025, 5:20 PM",
    read: false
  }
];

const DoctorPanel = () => {
  const [activeTab, setActiveTab] = useState("appointments");
  
  // Today's date for the header
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const upcomingAppointmentsCount = appointments.filter(a => a.status === "Upcoming").length;
  const unreadMessagesCount = messages.filter(m => !m.read).length;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-pet-dark mb-1">Doctor Panel</h1>
              <p className="text-gray-500">{today}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button className="bg-pet-blue hover:bg-pet-blue/90 text-white">
                My Schedule
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Today's Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pet-blue">{upcomingAppointmentsCount}</div>
                <p className="text-gray-500">scheduled for today</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Patient Records</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pet-blue">{patientRecords.length}</div>
                <p className="text-gray-500">active patients</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pet-blue">{unreadMessagesCount}</div>
                <p className="text-gray-500">unread messages</p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="appointments" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Appointments</span>
              </TabsTrigger>
              <TabsTrigger value="patients" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Patients</span>
              </TabsTrigger>
              <TabsTrigger value="messages" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Messages</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appointments" className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Today's Schedule</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Pet</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map(appointment => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="font-medium">{appointment.time}</div>
                        <div className="text-xs text-gray-500">{appointment.date}</div>
                      </TableCell>
                      <TableCell>
                        <div>{appointment.petName}</div>
                        <div className="text-xs text-gray-500">{appointment.petType}</div>
                      </TableCell>
                      <TableCell>{appointment.ownerName}</TableCell>
                      <TableCell>{appointment.reason}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <FileText className="h-4 w-4" /> View
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center gap-1">
                            <Check className="h-4 w-4" /> Complete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="patients" className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Patient Records</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pet Name</TableHead>
                    <TableHead>Type/Breed</TableHead>
                    <TableHead>Age</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Last Visit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientRecords.map(record => (
                    <TableRow key={record.id}>
                      <TableCell>{record.petName}</TableCell>
                      <TableCell>
                        <div>{record.petType}</div>
                        <div className="text-xs text-gray-500">{record.breed}</div>
                      </TableCell>
                      <TableCell>{record.age}</TableCell>
                      <TableCell>{record.ownerName}</TableCell>
                      <TableCell>{record.lastVisit}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <FileText className="h-4 w-4" /> Medical Records
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            
            <TabsContent value="messages" className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold mb-4">Patient Messages</h2>
              <div className="space-y-4">
                {messages.map(message => (
                  <Card key={message.id} className={message.read ? "bg-white" : "bg-blue-50"}>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">{message.subject}</CardTitle>
                          <p className="text-sm text-gray-500">From: {message.from}</p>
                        </div>
                        <p className="text-xs text-gray-500">{message.received}</p>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4">{message.message}</p>
                      <div className="flex justify-end gap-2">
                        <Button size="sm" variant="outline" className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" /> Reply
                        </Button>
                        <Button size="sm" variant="ghost" className="flex items-center gap-1">
                          <Check className="h-4 w-4" /> Mark as Read
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default DoctorPanel;
