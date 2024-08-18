const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/navy2', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Complaint Schema
const complaintSchema = mongoose.Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  item: { type: String, required: true },
  poweronpassword: { type: String, required: true },
  user_name: { type: String, required: true },
  defect: { type: String, required: true },
  status: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  deadline: { type: Date, required: true },
  currentStatus: { type: String, required: true },
  takenForRepairDateTime: { type: Date, default: Date.now },
  delivery_status: { type: String },
  dummyField2: { type: String }
});

const ComplaintModel = mongoose.model('complaints', complaintSchema);

// Bin Schema
const binSchema = mongoose.Schema({
  name: { type: String },
  unit: { type: String },
  item: { type: String },
  poweronpassword: { type: String },
  user_name: { type: String },
  defect: { type: String },
  status: { type: String },
  phoneNumber: { type: String },
  deadline: { type: Date },
  currentStatus: { type: String },
  takenForRepairDateTime: { type: Date },
  delivery_status: { type: String },
  dummyField2: { type: String },
  deletedAt: { type: Date, default: Date.now } // Track when it was moved to the bin
});

const BinModel = mongoose.model('bin', binSchema);

// Endpoint to create a new complaint
app.post('/save_complaint', async (req, res) => {
  try {
    const data = req.body;
    data.deadline = new Date(data.deadline);
    const newComplaint = new ComplaintModel(data);
    await newComplaint.save();
    res.status(201).send(newComplaint);
  } catch (error) {
    console.error('Error saving complaint:', error);
    res.status(500).send('Error saving complaint');
  }
});

// Endpoint to get all complaints
app.get('/all_complaints', async (req, res) => {
  try {
    const data = await ComplaintModel.find({});
    res.send(data);
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).send('Error fetching data');
  }
});

// Endpoint to get a single complaint by id
app.get('/complaint/:id', async (req, res) => {
  try {
    const complaint = await ComplaintModel.findById(req.params.id);
    if (complaint) {
      res.send(complaint);
    } else {
      res.status(404).send('Complaint not found');
    }
  } catch (error) {
    console.error('Error fetching complaint:', error);
    res.status(500).send('Error fetching complaint');
  }
});

// Endpoint to update a complaint by id
app.put('/update_complaint/:id', async (req, res) => {
  try {
    const updatedComplaint = await ComplaintModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedComplaint) {
      res.send(updatedComplaint);
    } else {
      res.status(404).send('Complaint not found');
    }
  } catch (error) {
    console.error('Error updating complaint:', error);
    res.status(500).send('Error updating complaint');
  }
});

// Endpoint to delete a complaint by id (soft delete)
app.delete('/delete_complaint/:id', async (req, res) => {
  try {
    // Find and remove the complaint from the complaints collection
    const complaint = await ComplaintModel.findById(req.params.id);
    
    if (complaint) {
      // Create a new bin entry from the complaint
      const binEntry = new BinModel(complaint.toObject());
      await binEntry.save();
      
      // Delete the original complaint
      await ComplaintModel.findByIdAndDelete(req.params.id);
      
      res.send('Complaint moved to bin');
    } else {
      res.status(404).send('Complaint not found');
    }
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).send('Error deleting complaint');
  }
});

// Endpoint to create a new bin entry (if needed separately)
app.post('/save_bin', async (req, res) => {
  try {
    const data = req.body;
    data.deadline = new Date(data.deadline);
    const newBin = new BinModel(data);
    await newBin.save();
    res.status(201).send(newBin);
  } catch (error) {
    console.error('Error saving bin entry:', error);
    res.status(500).send('Error saving bin entry');
  }
});

// Endpoint to get all bin entries
app.get('/all_bin_entries', async (req, res) => {
  try {
    const data = await BinModel.find({});
    res.send(data);
  } catch (error) {
    console.error('Error fetching bin entries:', error);
    res.status(500).send('Error fetching bin entries');
  }
});

// Endpoint to get a single bin entry by id
app.get('/bin_entry/:id', async (req, res) => {
  try {
    const binEntry = await BinModel.findById(req.params.id);
    if (binEntry) {
      res.send(binEntry);
    } else {
      res.status(404).send('Bin entry not found');
    }
  } catch (error) {
    console.error('Error fetching bin entry:', error);
    res.status(500).send('Error fetching bin entry');
  }
});

// Endpoint to restore a complaint from the bin by id
app.put('/restore_bin_entry/:id', async (req, res) => {
  try {
    const binEntry = await BinModel.findById(req.params.id);
    if (binEntry) {
      // Create a new complaint from the bin entry
      const newComplaint = new ComplaintModel(binEntry.toObject());
      await newComplaint.save();
      
      // Delete the bin entry
      await BinModel.findByIdAndDelete(req.params.id);
      
      res.send('Bin entry restored to complaints');
    } else {
      res.status(404).send('Bin entry not found');
    }
  } catch (error) {
    console.error('Error restoring bin entry:', error);
    res.status(500).send('Error restoring bin entry');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
