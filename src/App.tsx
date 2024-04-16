import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";

import {format, addDays} from "date-fns";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TimeScale,
  Deadline,
  TIME_SCALE_ARRAY,
  TIME_SCALE_TO_MESSAGE,
  processDateForSending,
  generateTimeScaleMapping,
  formatDateForShowing,
} from "./utils";
import { useDeadlineStore } from "./deadlineState";
import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { CalendarIcon } from "lucide-react";
import { cn } from "./lib/utils";
import { parseISO } from "date-fns/parseISO";
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";

const baseUrl = import.meta.env.VITE_DATA_URL;

function DatePicker({date, setDate}: {date: Date | undefined, setDate: (date: Date | undefined) => void}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-4/5 lg:w-1/2 min-w-[280px] border-2 border-slat-300 h-12 justify-start text-left font-normal ",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <Select
          onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

function DeadlineComponent({ deadline }: { deadline: Deadline }) {
  const updateDeadline = useDeadlineStore(state => state.updateDeadline)
  const deleteDeadline = useDeadlineStore(state => state.deleteDeadline)

  const handleSubmitUpdate = async (name: string, description: string, date: Date | undefined) => {

    if (!date || name === "" || description === "") {
      return;
    }

    const data = await fetch(`${baseUrl}api/deadline/update`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: deadline.id,
        title: name,
        description: description,
        endDate: date
      })
    })

    if (data.status === 200) {
      updateDeadline(deadline.id, name, description, date)
    }
  }

  const handleDelete = async () => {

    const data = await fetch(`${baseUrl}api/deadline/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(deadline.id)
    })
    if (data.status === 200) {
      deleteDeadline(deadline.id);
    }
  }
  return (
    <Card className="w-80 h-72">
      <CardHeader>
        <CardTitle className="text-black">{deadline.title}</CardTitle>
        <CardDescription>{deadline.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <h3>Deadline for this goal is <span className="font-bold">{formatDateForShowing(deadline.endDate)}</span>.</h3>
        <Button onClick={handleDelete} className="bg-red-600 my-2">Delete deadline</Button>
        <DeadlineDrawer handleSubmit={handleSubmitUpdate} drawerTriggerText="Update deadline" drawerTitle="Update deadline"/>
      </CardContent>
    </Card>
  );
}

function DeadlineDrawer({handleSubmit, drawerTriggerText, drawerTitle, classNameTrigger}: {handleSubmit: (name: string, description: string, date: Date | undefined) => void, drawerTriggerText: string, drawerTitle: string, classNameTrigger?: string}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { toast } = useToast(); 

  const handleSubmitClick = () => {
    if (name === "") {
      toast({
        variant: "destructive",
        title: "Empty name",
        description: "You must set a non-empty name first"
      });
      return;
    }
    if (description === "") {
      toast({
        variant: "destructive",
        title: "Empty description",
        description: "You must set a non-empty description first"
      });
      return;
    }
    if (date === undefined) {
      toast({
        variant: "destructive",
        title: "Non-valid date",
        description: "You must set a valid date first"
      });
      return;
    }
    
    setName("");
    setDescription("");
    setDate(undefined);
    handleSubmit(name, description, date);
  }

  return (
    <Drawer>
      <DrawerTrigger className={`${classNameTrigger} h-10 rounded-lg bg-blue-700 text-white hover:bg-blue-950 min-w-32`}>{drawerTriggerText}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-4xl">{drawerTitle}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="flex flex-col px-3 items-center lg:items-start">
          <input type="text" className="p-1 my-1 h-12 w-4/5 lg:w-1/2 border-slate-300 border-2 rounded-lg" placeholder="Deadline name" value={name} onChange={e => setName(e.target.value)}/>
          <input type="text" className="p-1 my-1 h-12 w-4/5 lg:w-1/2 border-slate-300 border-2 rounded-lg" placeholder="Deadline description" value={description} onChange={e => setDescription(e.target.value)}/>
          <DatePicker date={date} setDate={setDate}/>
        </DrawerDescription>
        <DrawerFooter>
          <DrawerClose className="flex flex-col items-center">
            <div className="bg-zinc-950 rounded h-12 w-96 text-white flex items-center justify-center hover:bg-slate-900" onClick={() => handleSubmitClick()}>Submit</div>
          </DrawerClose>
          <DrawerClose className="flex flex-col items-center">
            <div className="h-12 border-2 border-slate-200 w-96 flex items-center justify-center rounded-md">Cancel</div>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function DeadlineTimeScaledContainer({ timeScale, deadlines }: { timeScale: TimeScale, deadlines: Deadline[] }) {
  return (
    <div className="bg-slate-200 rounded-xl min-h-20 my-3 p-2">
      <h1 className="text-5xl my-3 font-bold">{TIME_SCALE_TO_MESSAGE[timeScale]}</h1>
      <div className="flex flex-row flex-wrap">
        { deadlines.length === 0 ? <h1>There are currently no deadlines with this timescale.</h1> : deadlines.map((deadline) => (
          <DeadlineComponent deadline={deadline} key={deadline.id} />
        ))}
      </div>
    </div>
  );
}

function DeadlineContainer() {
  const deadlines = useDeadlineStore(state => state.deadlines);
  const setDeadlines = useDeadlineStore(state => state.setDeadlines);
  const mapping = generateTimeScaleMapping(deadlines);
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseUrl}api/deadline/all`, {
        method: "GET"
      });
      const data = await response.json();
      for (const deadline of data) {
        deadline.endDate = new Date(deadline.endDate);
      }
      setDeadlines(data);
    }
    fetchData();
  }, [])
  return (
    <div>
      {TIME_SCALE_ARRAY.map((scale) => (
        <DeadlineTimeScaledContainer timeScale={scale} deadlines={mapping[scale]} key={scale}/>
      ))}
    </div>
  );
}



function App() {
  const createDeadline = useDeadlineStore(state => state.createDeadline)
  const handleSubmit = async (name: string, description: string, date: Date | undefined) => {
    if (!date) {
      return;
    }
    const createdDeadlineResponse = await fetch(`${baseUrl}api/deadline/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: name,
        description: description,
        endDate: processDateForSending(date)
      })
    })
    if (createdDeadlineResponse.status === 200) {
      const createdDeadline = await createdDeadlineResponse.json();
      createDeadline(createdDeadline.id, createdDeadline.title, createdDeadline.description, parseISO(createdDeadline.endDate))
    }
  };


  return (
    <main>
      <div className="w-full flex justify-center my-2">
        <DeadlineDrawer handleSubmit={handleSubmit} drawerTriggerText="Create deadline" classNameTrigger="w-4/5 lg:w-1/2" drawerTitle="Create a new deadline"/>
      </div>
      <DeadlineContainer />
      <Toaster/>
    </main>
  );
}

export default App;
